# x-render-js | New web solution.

> x-render-js - new library, which provide simple and fast function to create html code.

## 📺 Introduction.

Hello. I think you all know such market players as React, Vue or Angular. We all know that they are very heavy, right? Well, that's exactly why you should download this library and send IT giants into the past.

## ❓ Who needs it?

Good question. If we turn to the origins of JavaScript, then we will see that this is a language for web development. That is why you will need this library.

> I would like to say right away that it will be difficult to really appreciate the usefulness of the library if you do not use ExpressJS

## 📌 How it use?

You don't have to worry about it. To start, we do this:

```
$ npm i x-render-js
```

Good. Next:

```js
const { generate } = require('x-render-js');

// or
import generate from 'x-render-js';
```

It's all. Simple Example:

```js
const app = require('express')();
const { generate } = require('x-render-js');

app.get();
// ...

/* 404 */
app.use((req, res) => {
    res.send(generate('div', {
        classes: ['error-block'],
        html: '<h1 class="error-block__header> Page not found</h1>'
    }));
});
```

## 🎁 Bonus:

You can use nex props:

* ids.

```js
console.log(generate('div', {
    ids: ['test']
})); // => <div id="x-created-by="x-render-js test"></div>
```

* styles.

```js
console.log(generate('div', {
    styles: {
        'background': 'black',
        'color': 'white'
    }
})); // => <div style="background: black; color: white;></div>
```

* textContent.

```js
console.log(generate('div', {
    textContent: 'hello world!'
})); // => <div>hello world!</div>
```

## 📂 Other info.

> Package licensed by MIT LIcense.

> Package author HarrisonManxe.