---
layout: post
title: "Designing in-context editors"
date: 2012-03-30 16:40:04 +0100
comments: true
tags: [ux]
---

*This post was rescued from my old UX blog*

In-context (or ‘in-place’) editors allow users to edit content in the same page or space that they view it, rather than using a separate form or administration area. They establish a strong relationship between content and the tools used to manage it, which makes those tools extremely discoverable, and gives users confidence about the consequences of their activity. However, in-place editors can also pose certain design challenges. I take a look at these issues and offer some ideas on how to ameliorate them. <!--more-->

##What exactly is an in-context editor?

With an in-context editor, users edit web content in the document itself, rather than going through a separate edit or administration workflow. In most cases, this means a privileged user viewing their web page can simply click items to start editing them, then save these changes to the public view.

{% img center /images/2012/inContextEditor.png An example of a WYSIWYG in-context editor %}
*Above: The user simply clicks the text they want to change, and they can edit in place with a WYWIWYG control.*

##What benefits do they bring?

- They make edit controls extremely discoverable. If we establish that an element can be altered just by clicking it, our users will typically assume this applies to all other elements.
- They allow users to see content in context. If they are editing an element in relation to its context (to refer to another element on the page, for example), they can check that context as they draft their content.
- They give a user confidence in the consequences of their actions. When I’m editing a header element in place, I am certain that my changes are going to affect at least that component. When I am abstracted behind another edit form, I don’t have quite the same confidence – especially if the form’s title makes the relationship ambiguous.

##Are there any drawbacks?

Potentially, yes:

- In-place editors might be a poor choice for modular content that appears in a variety of pages or contexts. In-place editors encourage users to think in terms of individual, self-contained pages. That’s not always appropriate. Users will edit elements to ‘match’ the context they see them in, but no others. That could create content that’s well co-ordinated on one page but incoherent on another.
- Users will be encouraged to create content that only works for the platform they write it on, because in-place editors make users think about content in its surrounding context. If content is syndicated in different ways – say, a web page to mobile devices – this could create problems.
- In-place editors don’t stop WYSIWYG thinking, where users try to imply semantics and structure with visual formatting. In-place editors will always allow users to see their content as it will be eventually formatted, and this creates opportunities for users to mis-apply markup. On the web, this can create significant problems for SEO, accessibility and mobile usage.
- Because users see the edits they make immediately reflected on the page, they will not understand if other users cannot see their changes because the content still needs authorization or ‘publication’ of some sort.
- In-place editors require close visual relationship between edit fields and content. Typically, an edit field will take the same dimensions and position as the content to be changed. This places constraints on the design of edit controls, locations for messaging and formatting / metadata controls. There *are* workarounds for these issues, though they are imperfect.

##Maximizing the benefits – some pointers:
**To ensure edit controls are discoverable:**

- Users will only guess that they can edit something by clicking it if that behaviour is applied consistently across the page. Let users open elements for editing in the same way, and try to make all content on a page editable. If that’s not possible because some elements are dynamically generated, try to at least let users configure the behaviour of those elements. If it’s impossible because some elements simply cannot be edited full-stop, you will need to use non-intrusive visual design like shading or dotted borders to signify what can and cannot be changed.

**Emphasising the relationship between editor and content:**

- Editors and input fields should very closely match the size and position of the content they control
- Minimize visual differences between the content in the editor and in the page. If text is formatted in the page, it should be similarly formatted in the editor. If the page has a background, try to make that background inherit into the editor.
- Place ‘add new’ controls in the same position the new content will occupy
- Toolbars and controls should not disrupt the relationship between the editor and the document. In a text field, for example, you should avoid moving text downwards to accomodate a formatting toolbar, or else you introduce disparity between the text in the editor and the page it produces. One option is to make the toolbar float independently of the textfield:

{% img center /images/2012/editorDocked.png A toolbar is docked to the textfield %}

*Above: By 'docking' the toolbar to the side, we've minimized the differences between a textarea and the content it produces.*

##Ameliorating the drawbacks – some suggestions:
**Making in-place editors work with modular content**
- Consider letting the user edit the component, but in edit mode, indicate that the module exists in its own content by obscuring, removing or greying out the rest of the page

**Communicating ‘publishing’, ‘authorization’ or ‘verification’ steps**

- If the page appears in a prominent navigation or table of contents element, you might use that space to communicate that the page is still invisible or in ‘draft’ status
- You might experiement with making uncommited changes appear greyed out, semi-transparent or otherwise visually distinct from the rest of the page. Be careful to ensure, however, that users still have a clear sense of what the page will eventually look like.
- If all else fails, use strong application messaging that never implies the content is currently visible. This isn’t a great solution, but it may be the only option.

**Getting around constraints on editor design (such as the fact editors take the same position and size):**

- Exploit independent floating elements with strong visual ties to the currently active editor, as in the formatting toolbar example above.
- Consider putting controls common to all editors in a shared, independent space, such as at the top of the screen. There may be discoverability issues with this, however.

**Making users think about other contexts and platforms:**

- This isn’t really possible with an in-place editor. The whole point of in-place editing is that users work with content in its context, and equate their input in the editor with the page they see. If your content might be viewed by a variety of user agents (perhaps with radically different resolutions and rendering capabilities), you might want to avoid this pattern altogether.

##Comments (restored)

*This post generated some comments; I've included them as I think they're interesting*

**Jennifer Rullmann, April 2, 2012**

I’m using an in-context editor in a product I’m currently building, so needless to say I loved this thorough analysis of the pattern. Your readers who aren’t familiar with in-context editors might want to take a look at Aloha editor, they have an online demo that you can play with (here’s an example: http://aloha-editor.org/demos/aloha-world-example/).

When I interviewed potential customers for the product I’m building one of their biggest complains about their current solution was the disconnect between what they saw when entering content and the final result that was produced. I think in-context editors can be a great solution to that problem.

For me and my product, the biggest drawback to this pattern is one that you mentioned: they encourage WYSIWYG thinking. One way that I’ve tried to avoid this is by not including some common formatting options in these editors. For example, while you can bold or italicize text in my editor, you can’t change the color or font size of the text. My goal is to have an organization create style rules for their content, and then have users apply these styles rules where it makes sense. This would make it very easy for the organization to roll out style changes to all of their content.

Thanks for another great post!