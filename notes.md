# CS 260 Notes

[My startup - __ad Libs](https://startup.ad-libs.click/)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [Git Cheat Sheet](https://git-scm.com/cheat-sheet)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [CSS Selectors Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [MDN Animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

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
- I don't really like the nav element?? but that's probably just because it's not styled yet. Once I add CSS I think I would like it better, but I suppose I'll just have to see
- `<br/>` is like just a little line break and then `<hr/>` is a section break (it actually puts a line on the page)

## CSS
- made by defining `rulesets`/`rules`
```
// rule
selector {
  // declaration
  property: value;
}
```
- can be done in-line, with the style element, or with a style sheet
- precedence:
  - inline (ex: `style="color:black"`)
  - id selectors (ex: `#elementID {color: blue;}`)
  - class selectors, attribute selectors, and pseudo-classes (ex: `.class {color: green;}`)
  - element selectors and pseudo-elements (ex: `p {color: red;}`)
  - universal (wildcard) selector `*` and inherited styles
- here's this box drawing I snatched from the github:
![this box drawing I snatched from the github](https://raw.githubusercontent.com/webprogramming260/webprogramming/main/instruction/css/introduction/cssBoxModel.jpg)
- content >> padding >> border >> margin
  - `box-sizing` property can be changed to change width and height
- descendant combinator: "space delimited list of values where each item in the list is a descendant of the previous item" (ex: `div h1 {color: red;}`)
  - descendant (`div h1`: any h1 that's a descendant of div)
  - child (`div > h1`: any h1 that is a direct child of div)
  - general sibling (`img ~ p`: any p with an img sibling)
  - adjacent sibling (`img + p`: any p that has an adjacent img sibling)
- REMEMBER: `.` is class selector, `#` is ID selector, `[]` is attribute selector (as in `a[href]`), `:` is pseudo selector
- Units:
  - px    (pixels)
  - pt    (points [1/72 of an inch])
  - in    (inches)
  - cm    (centimeters)
  - %     (percentage of parent element)
  - em    (multiplier of width of letter m in parent's font)
  - rem   (multiplier of width of letter m in root's font)
  - ex    (multiplier of height of element's font)
  - vw    (percentage of viewport's width)
  - vh    (percentage of viewport's height)
  - vmin  (percentage of viewport's smaller dimension)
  - vmax  (percentage of viewport's larger dimension)
  - fr    (fractional unit of the parent's total width)
- for fonts:
```
@font-face {
  font-family: 'fam';
  src: url('htpps://url.ttf');
}

element {
  font-family: fam;
}
```
  - you can also load them from google if you don't want to host them on-server (`@import url('https://url')`)
- specify you're animating by including the `animation-name` property (this should refer to the name of the `keyframes` you wanna use) and the `animation-duration` property
```
@keyframes name {
  from {
    property-to-change: value;
  }
  num% {
    property-to-change: value;
  }
  to {
    property-to-change: value;
  }
}
```
- don't be a dummy -- debug it with the debug tools on the browser! guessing doesn't do a lot for you
- `display` property used to change how an element is displayed (`none`, `block`, `inline`, `flex`, `grid`)
- `float` property "moves an element to the left or right of its container element and allows inline elements to wrap around it"
- `@media` selector can be used to tell "which side of the screen (technically the viewport) is the longest"
```
@media (orientation: portrait) {
  div {
    transform: rotate(180deg); //or whatever
  }
}
```
- for grid or flex, you need to make a container for the children and set that container's display property to flex or grid
- some flex properties:
  - flex-direction: (column or row)
  - flex: growth-rate start-height
- you can use bootstrap or tailwind for this project (I'll probably use tailwind because I'm more familiar with it)

### React

- tbh I'm pretty confused about this stuff
- jsx is like. javascript and html had a baby so you can have all the logic and the structure in the same place. it allows for components and also routing
- run `npm run build` 'when you want to bundle your application so that you can deploy to a production environment'; executes build script, transpiles, and does all of the stuff to make it that it's deployment ready (puts it in a subdir called 'dist')
- `./deployReact.sh -k <yourpemkey> -h <yourdomain> -s startup` remember that you can use this to deploy your stuff
- for routing: make sure to check the debug console if it isn't routing properly!! the jsx won't display at all if there are any errors (may be import errors, may be syntax errors, etc)
- I think I'm starting to understand this?? it's just taking some practice. But I've been getting better with debugging jsx, so I think that's good lol (this note is nothing but a pack on the back for myself haha)

## JS
- w/ `console.log` you can do strings, formatted strings (like `'yo %s', 'hehe'`), and strings with style??? you can do `console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');`
- also with the console you can do timers?? `console.time('event_name')\rthing_to_do\rconsole.time('event_name')` will result in the time that it took to do `thing_to_do`
- and also you can do `.count`, which counts
- `let` makes a mutable object and `const` makes an immutable object
- primitive types
  - Null
  - Undefined
  - Boolean
  - Number
  - BigInt
  - String
  - Symbol
- object types
  - Object
  - Function
  - Date
  - Array
  - Map
  - JSON
- `===` is equality operator & `!==` is the inequality operator
- strings can use concat and equality
- `___ ? ___ : ___` ternary op (compact if/else)
- you can use `for`, `for in` (property names), `for of` (property values), `while`, `do while`, and `switch`
- `break` aborts a loop, `continue` advances it
- strings can be inside '', "", or \`\` (backticks mean string literals that can have JS inside of them w/ a `${}` around it)
- string functions: `length`, `indexOf()`, `split()`, `startsWith()`, `endsWith()`, `toLowerCase()`

**Functions**
- function name(parameters) { body; return;} (these fellas can be used just like any other variable bc they're first class objects)
- you won't get an error if you don't pass in all of the required parameters; instead, it'll just go "yeah so that's undefined" UNLESS you give it a default value (by the classic param = value syntax)
- anonymous function: const var = function (params) {} OR just that function bit passed in as a parameter to another function
  - or, you can do the ((a) => console.log(\`it's ${a}\`), "value") thing (curly braces around these are optional)
    - return keyword is optional if there's no curly braces and there's onlyl one expression (so the value of that expression is automatically returned)
    - these inherit the 'this' pointer from the scope they were created in, which creates a closure ("closure allows a function to continue referencing its creation scope, even after it has passed out of that scope") -- basically, it lets you maintain the value of variables from the first time that function was ever referenced/was created
- debounce functions execute a given function once w/in a given time window

- array functions
  - push
  - pop
  - slice
  - sort
  - values
  - find
  - forEach (run func on each array item)
  - reduce (reduce each item array into a single item)
  - map (map an array to new array)
  - filter (remove items)
  - every (every item match?)
  - some (any items match?)
- Object properties can be accessed via . or []
  - entries, keys, and values are some static functions you can use on Objects
- "any function that returns an object is considered a constructor & can be invoked with the new operator"
- class functions and properties can be privated with a hash as a prefix! e.g. `#property`
- JSONs are always encoded w/ UTF-8
- convert to and from JSON w/ `JSON.parse` and `JSON.stringify`
- you can store stuff in your browser w/ the `localStorage` API (MUST be a string, number or boolean) --> use this for your basic login stuff before you make it actually work!
  - `setItem(name, value)`
  - `getItem(name)`
  - `removeItem(name)`
  - `clear()`

**Promises**
- async operations
- may be:
  - pending (going)
  - fulfilled (done)
  - rejected (failed)
- resolve: func that sets the promise to `fulfilled`
- reject: func that sets the promise to `rejected`
- then, catch, and finally may be used esentially as try/catch

**Async/Await**
- like promises, but a little different
- await "wraps the execution of a promise...will block until the promise state moves to fulfilled, or throws an exception if the state moves to rejected"
- promise then/catch chain === await try/catch block
- can only be called @ the top level of the JS or in a func. defined w/ async keyword (async makes it return a promise that resolves to the val previously returned by the func. (paraphrase))
- await "wraps a call to the async function, blocks until the promise has resolved, and then returns the result of the promise" -- so it makes everything stop until the promise is taken care of, and then the promise result is returned instead of the promise object

- destructuring is breaking down an item into multiple (e.g. `const a = [1,2]; const [b, c] = a;`, in which case `b = 1` and `c = 2`)
  - you can map the vars to specific vals in an object by going `key: var`

**React + JS**
- `state` value is recorded in a table and is updated whenever an `updateState` method is called
- and then to use you do `React.useState('state')`

**Hooks**
- `useState` (see above)
- `useEffect` (does something every time the component is rendered (by default); can be changed to be called at different times)
  - specifying an empty array makes the hook only call on the first render of the component
- "Hooks must be called at the top scope of the function and cannot be called inside of a loop or conditional. This restriction ensures that hooks are always called in the same order when a component is rendered."