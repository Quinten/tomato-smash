# Tomato Smash

Throw tomatoes at websites with this bookmarklet!

What is a bookmarklet? A bookmarklet is a bookmark in your browser, but instead of a url it contains a small piece of javascript, that gets executed on the webpage you are currently visiting when you click the bookmark.

With the following bookmarklet you can throw tomatoes at any website. Almost any website, because some sites impose restrictions on scripts.

### How to install?

Create a bookmark in your browser with a funny name and paste the following script into the url field:

```
javascript:(_=>{import('https://quinten.github.io/tomato-smash/index.js').then(_=>{new TomatoSmash.Game()})})()
```

Visit a website and click the bookmarklet. Tomatoes are thrown up and when you click them with your mouse or dirty tap finger and they get smashed onto the page. (Works on mobile too.).

### Links

The game was made for [Bookmarklet Jam](https://itch.io/jam/bookmarklet-jam).

It was the first time i used my new [Verf HTML5 game framework](https://github.com/Quinten/verf) in a jam.
