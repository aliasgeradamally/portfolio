# Adding a poem

Open `poems.js` and add one object inside `window.POETRY_ENTRIES`. Keep a comma between entries. The newest entry appears first on the page.

For a regular poem, copy this and replace the title and lines:

```js
{
  title: 'A new poem',
  verses: [
    { text: `First line
Second line

Start a new stanza with a blank line` }
  ]
}
```

For Urdu with a romanized version, use two verse blocks:

```js
{
  title: 'A new Urdu poem',
  format: 'urdu-letter',
  verses: [
    { text: `اردو یہاں`, language: 'ur' },
    { text: `Romanized version here`, style: 'roman' }
  ]
}
```

You can add more verse blocks to separate scripts or sections. Put a blank line inside the backticks to create a stanza break. Leave the braces and commas in place, then save `poems.js`; no other file needs editing.
