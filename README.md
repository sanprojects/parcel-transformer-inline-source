# parcel-transformer-inline-source
Parcel v2 plugin for an inline any type of files into a html, css and even js files.

## Install

```bash
npm install https://github.com/sanprojects/parcel-transformer-inline-source --save-dev
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
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>parcel-plugin-inline-source</title>
    <link rel="stylesheet" href="./style.css" inline="inline"/>
</head>
<body>
<script src="https://cdn.jsdelivr.net/npm/preact/dist/preact.min.js"></script>
<script src="index.js" inline="inline"></script>
</body>
</html>
```

```css
/* style.css */
header,
footer {
    padding: 2em;
    background: #16f;
    color: #fff;
}

section {
    padding: 2em;
    background: #fff;
    color: #16f;
}
```

```js
// index.js
import { render, Component } from 'preact';

class App extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        setInterval(this.update.bind(this), 1000);
        this.update();
    }
    update() {
        this.setState({ time: new Date() });
    }
    render() {
        let { time } = this.state;
        return (
            <article>
                <header>parcel-plugin-inline-source</header>
                <section>
                    <span>{time ? time.toLocaleString() : ''}</span>
                </section>
                <footer>
                    <a href="https://github.com/xingqiao">@xingqiao</a>
                </footer>
            </article>
        );
    }
}

render(<App />, document.body);
```

### Build:

```bash
parcel build index.html
```

### Output:

```html
<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>parcel-plugin-inline-source</title><style>footer,header{padding:2em;background:#16f;color:#fff}section{padding:2em;background:#fff;color:#16f}</style></head><body> <script src="https://cdn.jsdelivr.net/npm/preact/dist/preact.min.js"></script> <script>parcelRequire=function(e,t,n,r){/* 代码太长，省略…… */},{"@babel/runtime/helpers/classCallCheck":"0fcM","@babel/runtime/helpers/createClass":"P8NW","@babel/runtime/helpers/possibleConstructorReturn":"0421","@babel/runtime/helpers/getPrototypeOf":"UJE0","@babel/runtime/helpers/inherits":"d4H2",preact:"OmAK"}]},{},["Focm"]);</script> </body></html>
```
