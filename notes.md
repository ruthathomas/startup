# CS 260 Notes

[My startup - __ad Libs](https://startup.ad-libs.click/)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Git Cheat Sheet](https://git-scm.com/cheat-sheet)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)

## AWS

- IP Address: 52.20.129.103
- Command to ssh in: `ssh -i [key pair file] ubuntu@52.20.129.103`
  - (remember that you're allowed to copy the path to the key pair file and just paste it in lol)
- leave the server on!!
- current base site is https://ad-libs.click/

## HTML

- I didn't know that `aside` was a thing -- maybe I should try using it??
- remeber that `ol` means 'ordered list' and `ul` means 'unordered list' AND ALSO `li` is list item
- [input elements reference sheet](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input)
<!-- Except also, here is just this table of input elements because I wanted it here (FIXME make sure that you've got the markdown correct next time you push!!):
|Element|Meaning|Example|
|-------|-------|-------|
|form*|Input container and submission|`<form action="form.html" method="post">`|
|fieldset**|Labeled input grouping|`<fieldset> ... </fieldset>`|
|input|Multiple types of user input (username, password, email, telephone...)|`<input type="" />`|
|select*|Selection dropdown|`<select><option>1</option></select>`|
|optgroup|Grouped selection dropdown|`<optgroup><option>1</option></optgroup>`|
|option|Selection option|`<option selected>option2</option>`|
|textarea|Multiline text input|`<textarea></textarea>`|
|label|Individual input label|`<label for="range">Range: </label>`|
|output|Output of input|`<output for="range">0</output>`|
|meter**|Display value with a known range|`<meter min="0" max="100" value="50"></meter>`|
*historically have had issues with this one
**never heard of this one -->
- remember for input: `name`, `disabled`, `value`, `required` properties
- `svg` and `canvas` are used to render images--can be animated
- media path can be relative or full (relative must be from same location as the HTML page that's rendering the element)