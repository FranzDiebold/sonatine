const fs = require("fs");

const pipeline = require("./icomoonCli");

const glyphs = JSON.parse(fs.readFileSync("glyphs/glyphs.json"));
const fallbackGlyphs = JSON.parse(
  fs.readFileSync("fallbackGlyphs/fallbackGlyphs.json")
);

pipeline({
  selectionPath: "sonatine-selection.json",
  outputDir: "output",
  forceOverride: true,
  names: glyphs.names.concat(fallbackGlyphs.names),
  icons: glyphs.icons.concat(fallbackGlyphs.icons),
});
