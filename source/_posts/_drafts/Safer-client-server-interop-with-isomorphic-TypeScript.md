---
title: Safer client-server interop with isomorphic TypeScript
date: 2019-02-04 15:44:03
tags: TypeScript, testing
---

One of the most common points of failures in web applications is client-server interop. A simple change in an upsteam API - renaming a field, changing its type, altering the way non-values are represented - can have catastrophic effects when the user renders the right UI component at exactly the wrong time.

Traditionally, web teams have tried to mitigate these risks with extensive inter-process integration tests. Termed 'functional' or 'end to end' tests, these automated checks usually spin up entire web browsers, databases and servers just to perform simple validations, provide feedback that is both slow and imprecise, are prone to false positives and have maintenance burdens of their own.

In my recent projects, however, I've found that isomorphic TypeScript types and interfaces, used with modern TypeScript features like type guards and predicates, can go a long way to providing much more lightweight validation that's *nearly* as robust.

<!--more-->

## Exactly what problem are we solving?

I want to know that my server code returns *predictable types* that the client is *able to consume*. I don't want to test this manually, and I'd like to write as few functional tests as I can get away with, so I'd like static analysis to do as much of the heavy lifting as possible.

I am not necessarily looking for cast iron code provability. I am happy to assume the developer must apply some self discipline when telling the TypeScript compiler the types of certain values, provided those rules are so simple that mistakes are easy to spot in code review and similarly easy to fix.

## Our example: a table component

An online mail-order haberdashery firm, ButtonsForMe.com, requires an internal system for tracking customer orders. This will take the form of a huge table of all outstanding orders, listed by deadline.

As a first pass you have written this as (for the sake of argument) a Node.js Express app, with a React frontend. Both are written in TypeScript and are built from the same repository.

Your backend code might look a little like this:

{% codeblock %}
const app = express();

app.get('/orders', async (req: Request, res: Response) => {
    const results = await orderService.getLatest();
    res.json(results);
}
{% endcodeblock %}

And your client code like this:

{% codeblock %}
interface State {
    loading: boolean,
    orders?: Array<OrderSummary>
}

class MyTable extends React.Component<Props, State> {
    constructor(props: Props) {...}

    async componentDidMount() {
        const orders = fetch('/orders').json() as Array<OrderSummary>;
        this.setState({orders});       
    }

    render() {...}
}
{% endcodeblock %}

(This is a little contrived, and more than a little oversimplified, but you get the idea.)

But there are several weaknesses with this code:

1. The backend might emit an error, perhaps a 4XX or 5XX. We don't know what type, or how to format this.
2. The frontend might be expecting the wrong type. Perhaps the Express code actually returns an object, but the type assertion (`foo as Array<Orders>`) elides this.
3. The backend might be returning the wrong type. Perhaps there's a bug in the function. Or perhaps `orderService.getLatest` doesn't return what we think it will (perhaps whole `Orders` rather than `OrderSummaries`?)

What we need instead is

1. A way of specifying both data and error types the backend can return
2. Some form of proof that the backend controller is sending these types
3. A way of differentiating between data and error types on the front end
4. A way to avoid error-prone type assertions

## Solving the problem with type checks

### Create an API Error type

We need an interface that represents structured error data and can be distinguished at runtime from actual content. We also need a way to refer to this interface in both client and server code.

You might solve this with a simple `APIError` interface with a field unique to exceptions:

{% codeblock %}
interface APIError {
    isError: true,
    message: string,
    userReference: number
}
{% endcodeblock %}

Alternative names may be `ErrorResponse` or `BackendException`. You might want to play with alternatives to `message` and `code` fields too, depending on your needs.

What's important is that you have a way of representing exceptions the server can tell the client, so you can write strictly-typed code that can format errors for human beings and (if needs be) aid with support queries (which is where error references are helpful).

This type needs to be consumable by both client and server code, so I would put it under a `/src/types` directory. I like to put interfaces like this in an `ipc.d.ts` file (standing for **I**nter **P**rocess **C**ommunication), along with any other types specific to client-server communications.

### Prove that backend controllers return real content or API Errors

If we turn our controller into a function that simply returns values, it's very easy for TypeScript to prove they work as expected:

{% codeblock %}
export async function getOrderSummaries(): Promise<[HTTPCode, Array<OrderSummary> | APIError]> {
    try {
        const latest = orderService.getLatest();
        return [200, latest];
    } catch (error) {
        return errorController.handle(error);
    }
}
{% endcodeblock %}

{% codeblock %}
// in app.ts

app.get('/orders', async (req: Request, res: Response) => {
    const [code, payload] = await orderController.getOrderSummaries();
    res.status(code).send(payload);
});
{% endcodeblock %}

We now know `getOrderSummaries` will always come up with a valid HTTP code and a typed JSON response of either the requested data or a structured error. That error will always be in a shape that can be formatted for the user.

So long as the developer doesn't call the wrong controller, this code is much harder to break. Yes, they might make a typo in the route matcher string, but this can be checked by our server-level integration tests. We hopefully no longer need end to end tests to prove the backend is suitable for use by a (correct) frontend.

What is `errorController.handle`? Again, it's just a function that returns a tuple of a `HTTPCode` and an `APIError`. It might look something like this:

{% codeblock %}
export function handle(err: any): [HTTPCode, APIError] {
    let userReference: number = uuid(),
        payload: APIError;

    if (err instanceof Error) {
        // is programmatic exception
        code = 500;
        payload: APIError = {
            isError: true,
            message: 'Something went wrong...',
            userReference
        };
        log(userReference, err.message, err.stack);

    } else if (err && err.response) {
       // is upstream API / DB operational error
       ...
    }

    return [code, payload];
}
{% endcodeblock %}

Notice how I'm using return values as far as possible and avoiding calling the Express API inside my controllers, or throwing exceptions to invoke error-handling middleware? Both are common practices in Express projects, but in general it's a good idea to both write controllers as pure functions, and avoid using throws as a means of flow control. If nothing else, it makes controllers much easier to unit test.

## Use typed API data on the client

So we know that a client calling `/orders` will get data of a particular type, but how can we tell TypeScript this? TSC doesn't know that a particular string send to `XMLHttpRequest.send` or `fetch()` results in a particular function being called in the backend. This is where some programmer discipline comes in.

Most projects will have some kind of functions to abstract over calling the backend API. It's at this point we can tell TypeScript how a particular REST call maps to a certain set of response types.

{% codeblock %}
async function getJSON<T>(url: string): Promise<T|APIError> {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        }
    });
    return await response.json();
}

export async function getOrders() {
    return getJSON<Array<OrderSummary>>('/orders');
}

export async function getOrder(id: string) {
    return getJSON<Order>('/order/' + id); 
}

export async function getUser(id: string) {
    // et cetera
}
{% endcodeblock %}

Can a developer get this wrong? Can they accidentally tell TSC that `getOrders` returns an array of `Users` rather than `OrderSummaries`? Yes, they can, but it should be fairly obvious when they do so, easy to spot during code review, and very simple to fix. It's up to you whether the risk of this necessitates a whole functional test suite.

## Use type guards and predicates to use API data safely

Now I know that my call to `getOrders` returns an `Array<OrderSummary>` or `APIError`, I can use type guards and predicate functions to narrow down the type at runtime in a way TypeScript recognises.

We'll start by writing a predicate function, `isAPIError`:

{% codeblock %}
export function isAPIError(apiResponse: Object) is APIError {
    return apiResponse.isError === true;
}
{% endcodeblock %}

The `is` keyword in a TypeScript function return type marks it as a type predicate function. This means the function returns a boolean equivalent to the specified runtime type check, and when the return value is used in an if-block or switch statement TypeScript can infer the shape of the value for that particular block.

Now we can use this in an if-block to narrow our types:

{% codeblock %}
interface State {
    loading: boolean,
    orders?: Array<OrderSummary>,
    errorMessage?: string
}

class MyTable extends React.Component<Props, State> {
    constructor(props: Props) {...}

    async componentDidMount() {
        const response = getOrders();
        if (isAPIError(response)) {
            // TSC knows this must be an APIError
            // Attempting to access the orderSummary array will throw a TSC exception
            this.setState({errorMessage: `${response.errorMessage}. Reference code ${response.referenceCode}`});

        } else {
            // TSC knows this *cannot* be anything other than an Array<OrderSummary>
            this.setState({orders: response});
        }
    }

    render() {...}
}
{% endcodeblock %}

And we have a much more robust front end.

## Conclusions

TypeScript can provide enormous boons to web projects when types can be shared across front and back end code. We can perform lightweight, robust validation relying on a minimum of programmer care.

Does this replace end to end tests completely? No, but it can certainly curtail their number and their scope; it can limit them to relatively simple integration checks and give us confidence in our code before running a lengthy regression suite. If nothing else it can add an extra layer of safety with fairly low effort.

Not only that, but relying on type checking for validation forces us to write code that's easy to type check, and that often means writing code that's highly functional, referentially transparent and free of side effects. And as a happy coincidence, that often proves the easiest code to unit test and to refactor.

If you've been writing isomorphic TypeScript and have any insights on testing, checking and validating functionality, write a comment below - I'll be interested to hear your experiences.