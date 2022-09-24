# parcel-transformer-inline-source
Parcel v2 plugin for an inline any type of files into a html, css and even js files.

## Install

```bash
npm i parcel-transformer-inline-source --save-dev
```

Add to `.parcelrc`
```json
{
  "transformers": { "*": ["...", "parcel-transformer-inline-source"] }
}
```

## How it works

### Source:

```html
<!-- index.html -->
Inline script to html
<script>
    <!--=> include("index.js"); -->
</script>

Include other html 
<!--=> include("footer.html"); -->
```

```css
/* style.css */

/*=> include("someOtherStyles.css"); */
```

```js
// index.js

// include other js file into current file
/*=> include("other.js"); */

// load file to string 
let code = `/*=> include("../../../../modules/snackbar/index.js"); */`;
```