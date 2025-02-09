# hexo-d2

Display d2 diagrams in [Hexo](https://hexo.io/) blog posts.

## Installation

First of all, you need to install `d2`:

```bash
curl -fsSL https://d2lang.com/install.sh | sh -s --
```

Next install the plugin `hexo-d2`:

```bash
npm install hexo-d2 --save
```

## Usage

You can display d2 diagrams using mermaid-like grammar:

``````
```d2
Stage One -> Stage Two -> Stage Three -> Stage Four
Stage Four -> Stage One: repeat
```
``````

And it will be displayed as

<div class="d2-diagram" style="width: 30%; margin: auto;"><img src="img/example.svg"> </img></div>

## Configurations

The command to generate SVGs is:

```bash
d2 <d2file> <svgfile> --pad 10
```

And the HTML to display the SVGs is:

```html
<div class="d2-diagram" style="width: 30%; margin: auto;">${svgContent}</div>
```

Feel free to modify them to fulfill your needs!

## License

This plugin is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
