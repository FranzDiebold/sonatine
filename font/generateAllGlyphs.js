const fs = require('fs');
const { createSVGWindow } = require('svgdom');
const { SVG, registerWindow } = require('@svgdotjs/svg.js')
const _ = require('lodash');

const allGlyphNames = require('./lib/allGlyphNames');
const generateGlyph = require('./lib/glyphGenerator');

const basePath = 'glyphs';
const glyphsPath = `${basePath}/glyphs`;

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
};

const generateGlyphSvg = (glyphStr, path) => {
    const canvas = getCanvas();

    const glyphSize = generateGlyph(canvas, glyphStr);
    canvas.size(glyphSize.width, glyphSize.height);
    fs.writeFileSync(path, canvas.svg());
}

const generateAllGlyphs = () => {
    const allGlyphs = allGlyphNames.getAllGlyphNames();
    const percentCount = Math.ceil(allGlyphs.length / 100.0);
    const glyphNames = allGlyphs
        .map((glyphs, idx) => {
            const glyphPath = `${glyphsPath}/glyph-${idx}.svg`;
            generateGlyphSvg(glyphs[0], glyphPath);
            if (idx % percentCount === 0) {
                console.log(`${Math.ceil(100.0 * idx / allGlyphs.length)}% (${idx}/${allGlyphs.length})`);
            }
            return [glyphPath, glyphs];
        });
    const glyphsAndNamesList = _.unzip(glyphNames);
    fs.writeFile(`${basePath}/glyphs.json`, JSON.stringify({ icons: glyphsAndNamesList[0], names: glyphsAndNamesList[1]}), (err) => {
        if (err) {
            console.error(err);
        }
    });
}

clean();
generateAllGlyphs();
