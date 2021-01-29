const express = require('express');
const helmet = require('helmet');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const svg2img = require('svg2img');

const generateGlyph = require('./glyphGenerator');

const app = express();
app.use(helmet());
const port = process.env.PORT || 3000;

const getCanvas = () => {
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);
    return SVG(document.documentElement);
};

app.get('/:glyphName.svg', (req, res) => {
    const canvas = getCanvas();

    const glyphSize = generateGlyph(canvas, req.params.glyphName);
    if (glyphSize) {
      canvas.size(glyphSize.width, glyphSize.height);
      res.header('Content-Type', 'image/svg+xml')
      res.send(canvas.svg());
    } else {
      res.sendStatus(404);
    }
});

app.get('/:glyphName.png', (req, res) => {
  const canvas = getCanvas();

  const glyphSize = generateGlyph(canvas, req.params.glyphName);
  if (glyphSize) {
    const scalingFactor = 1;
    const imgOptions = {
      width: scalingFactor * glyphSize.width,
      height: scalingFactor * glyphSize.height,
      preserveAspectRatio: true,
    };
    svg2img(canvas.svg(), imgOptions, function(error, buffer) {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length
      });
      res.end(buffer);
    });
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
