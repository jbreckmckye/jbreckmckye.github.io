---
title: Style Guide
date: 2013-06-15
archived: true
tags: [test, style-guide]
---

This post exists to test the blog's typography and layout. It exercises various markdown elements to ensure styles work correctly.

<!--more-->

## Headings

The following demonstrates heading hierarchy:

## This is an H2

Some paragraph text between headings to show normal spacing.

### This is an H3

More paragraph text here.

#### This is an H4

And finally some body copy.

### Adjacent Headings

Sometimes headings appear consecutively:

## H2 Followed Immediately by H3
### Like This One Here

And then content resumes.

## Text Formatting

Regular paragraph with **bold text**, *italic text*, and `inline code`. You can also have ***bold italic*** text and ~~strikethrough~~ if supported.

Here's a [link to somewhere](https://example.com) and here's another [external link](https://github.com) in the same paragraph.

> This is a blockquote. It should be styled distinctly from regular paragraphs.
> 
> It can span multiple paragraphs too.

## Lists

Unordered list:

- First item
- Second item with longer text that might wrap to multiple lines depending on viewport width
- Third item
  - Nested item one
  - Nested item two
- Fourth item

Ordered list:

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Fourth step

## Code Blocks

Inline code looks like `const foo = 'bar'` within a sentence.

```javascript
// JavaScript with syntax highlighting
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

const result = greet('World');
```

```python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(10):
    print(fibonacci(i))
```

Plain code block without language:

```
This is plain text in a code block.
No syntax highlighting here.
Just monospace font.
```

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Dark mode | ✓ Complete | Default theme |
| Responsive | ✓ Complete | Mobile-first |
| Comments | ✓ Complete | Via Giscus |
| Search | ✗ Pending | Future feature |

A wider table to test overflow:

| Library | Stars | Released | Age | Maintainer | License | Weekly Downloads |
|---------|-------|----------|-----|------------|---------|------------------|
| React | 96986 | March 2015 | 3 years | Meta | MIT | 19,000,000 |
| Vue | 95727 | October 2015 | 2.5 years | Evan You | MIT | 4,500,000 |
| Angular | 58531 | October 2010 | 7.5 years | Google | MIT | 3,200,000 |

## Images

Images should be responsive and centered:

![Placeholder image](https://via.placeholder.com/800x400/1e293b/64748b?text=Sample+Image)

## Horizontal Rules

Content above the rule.

---

Content below the rule.

## Mixed Content

This section combines multiple elements to test their interaction.

Here's a paragraph followed immediately by a list:

- Item right after paragraph
- Another item

And a list followed by a code block:

1. Step one
2. Step two

```bash
echo "Code right after list"
```

> A blockquote followed by a table:

| One | Two | Three |
|-----|-----|-------|
| A | B | C |

## Long Content

This paragraph contains enough text to demonstrate how body copy flows across multiple lines. Good typography requires attention to line length, line height, and letter spacing. The ideal line length for reading is generally considered to be between 45-75 characters. Too short and the eye has to jump too frequently; too long and it's hard to track back to the start of the next line.

Another paragraph to show spacing between blocks of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Edge Cases

### Very Long Heading That Might Wrap to Multiple Lines on Smaller Screens

Testing how the gradient underline handles wrapping.

### `Code in Heading`

Sometimes headings contain inline code.

### Heading with *Emphasis* and **Strong**

Mixed formatting in headings.

---

End of style guide.
