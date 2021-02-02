const fs = require('fs');

const pipeline = require('./icomoonCli');

const glyphs = JSON.parse(fs.readFileSync('glyphs/glyphs.json'));

pipeline({
  selectionPath: 'notes-selection.json',
  outputDir: 'output',
  forceOverride: true,
  names: glyphs.names,
  icons: glyphs.icons,
});
