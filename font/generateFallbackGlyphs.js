const fs = require('fs');
const _ = require('lodash');
const xml2js = require('xml2js');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js')

const { getAllGlyphNames } = require('./lib/allGlyphNames');

const basePath = 'fallbackGlyphs';
const glyphsPath = `${basePath}/glyphs`;

const digits = _.range(10)
    .map(digit => digit.toString());
const alphabet = _.range(65, 91).concat(_.range(97, 123))
    .map(charCode => String.fromCharCode(charCode));
const classicFallbackChars = digits.concat(alphabet);

const allCharsInLigatures = new Set(
    getAllGlyphNames()
        .flatMap(ligatureEquivs => ligatureEquivs
            .flatMap(ligature => [...ligature])
        )
        .concat(classicFallbackChars)
);
const characters = new Set(
    getAllGlyphNames()
        .flatMap(ligatureEquivs => ligatureEquivs
            .filter(ligature => ligature.length === 1)
        )
);
const characterDifference = [...allCharsInLigatures]
    .filter(c => !characters.has(c))
    .sort();

const clean = () => {
    fs.rmdirSync(basePath, { recursive: true });
    [basePath, glyphsPath].map(path => {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    });
}

const getCanvas = () => {
    const window = createSVGWindow();
    const document = window.document;
    registerWindow(window, document);
    return SVG(document.documentElement);
}

const generateGlyphSvg = (svgPath, filePath) => {
    const sizeX = 55;
    const sizeY = 300;
    const color = '#000';
    const scaleFactor = 0.025;

    const canvas = getCanvas();
    const path = canvas.path(svgPath).stroke({ color: color, width: 0 });
    const left = sizeX / 2 - path.cx();
    const top = sizeY / 2 - path.cy();
    path.transform({
        translate: {
            x: left,
            y: top,
        },
        scale: scaleFactor,
        flip: 'y',
    });
    canvas.size(sizeX, sizeY);
    fs.writeFileSync(filePath, canvas.svg());
}

const generateFallbackGlyphs = () => {
    const parser = new xml2js.Parser();
    fs.readFile('res/open-sans-v18-latin-700.svg', function(err, data) {
        parser.parseString(data, function (err, result) {
            const allFontGlyphsMap = result['svg']['defs'][0]['font'][0]['glyph']
                .map(glyphObj => glyphObj['$'])
                .reduce((glyphsMap, glyph) => {
                    glyphsMap[glyph.unicode] = glyph.d;
                    return glyphsMap;
                }, {});

            const glyphNames = characterDifference
                .map((char, idx) => {
                    const svgPath = allFontGlyphsMap[char];
                    const filePath = `${glyphsPath}/glyph-fallback-${idx}.svg`;
                    generateGlyphSvg(svgPath, filePath);
                    return [filePath, [char]]
                });
            const glyphsAndNamesList = _.unzip(glyphNames);
            fs.writeFile(`${basePath}/fallbackGlyphs.json`, JSON.stringify({ icons: glyphsAndNamesList[0], names: glyphsAndNamesList[1]}), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    });
}

clean();
generateFallbackGlyphs();
