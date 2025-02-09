# hexo-d2

Display d2 diagrams in [Hexo](https://hexo.io/) blog posts.

## Installation

### Step 1: Install d2

To use this plugin, you need to install the d2 diagramming tool:

```bash
curl -fsSL https://d2lang.com/install.sh | sh -s --
```

### Step 2: Install hexo-d2

Next, add the hexo-d2 plugin to your Hexo project:

```bash
npm install hexo-d2 --save
```

## Usage

To display D2 diagrams, you can use a syntax similar to Mermaid. Add code blocks with the d2 language identifier:

``````
```d2
Stage One -> Stage Two -> Stage Three -> Stage Four
Stage Four -> Stage One: repeat
```
``````

The diagram will be rendered and displayed as an SVG:

<div class="d2-diagram" style="width: 30%; margin: auto;"><img src="img/example.svg"> </img></div>

## Configuration

The command used to generate SVGs from D2 files is:

```bash
d2 <d2file> <svgfile> --pad 10
```

You can customize the HTML template for displaying the SVGs as needed. The default format is:

```html
<div class="d2-diagram" style="width: 30%; margin: auto;">${svgContent}</div>
```

Feel free to adjust the command or HTML to match your specific requirements.

## License

This plugin is licensed under the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.
