# :notes: Sonatine

## A musical symbols explorer and a font to easily write musical notes!

<a href="https://www.sonatine.ml" target="_blank"><img src="https://img.shields.io/badge/demo-online-3273dc.svg" alt="demo: online"></a>
[![Build and Deploy](https://github.com/FranzDiebold/sonatine/actions/workflows/deploy.yml/badge.svg)](https://github.com/FranzDiebold/sonatine/actions/workflows/deploy.yml)
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)

The project is splitted into several modules:

## Lib

The lib is the **core** to generate musical symbols. It is used in all other parts of this project.
The library [SVG.js](https://github.com/svgdotjs/svg.js) is used to generate the musical symbols as in SVG format.

Furthermore, the following sources and tools were used during development:

- [List of musical symbols](https://en.wikipedia.org/wiki/List_of_musical_symbols)
- [Bravura music font](https://github.com/steinbergmedia/bravura) (https://w3c.github.io/smufl/gitbook/tables/time-signatures.html)
- [Method Draw Vector Editor](https://editor.method.ac)
- [Inkscape](https://gitlab.com/inkscape/inkscape)

## Font

The font "Sonatine" combines all musical symbols to write musical notes in your favorite typesetting or word processing software.

### Stats

| Number of  | #      |
|------------|--------|
| Glyphs     | 11,820 |
| Characters | 26     |
| Ligatures  | 47,826 |

- [IcoMoon](https://icomoon.io)
- [IcoMoon CLI](https://github.com/Yuyz0112/icomoon-cli)
- [Docker Puppeteer](https://github.com/buildkite/docker-puppeteer)
- [OpenSans Font](https://github.com/googlefonts/opensans)

## Webapp

The webapp helps to explore the musical symbols and the font.

It uses the following technologies/libraries:

- [React](https://github.com/facebook/react/)
- [Bulma](https://github.com/jgthms/bulma)
- [React-bulma-components](https://github.com/couds/react-bulma-components)

## Server

The server generates both SVG and PNG files of the musical symbols.

It uses the following technologies/libraries:

- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [Helmet](https://github.com/helmetjs/helmet)

### Other useful tools

A really nice tool to inspect fonts is [FontDrop!](https://fontdrop.info).
