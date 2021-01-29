const _ = require('lodash');

const paths = require('./paths');

const sizeY = 300;
const defaultMargin = 5;
const staffHeight = 100;
const numLines = 5;
const minStemLength = 0.85 * staffHeight;
const baseY = (sizeY + staffHeight) / 2;
const halfLineHeight = staffHeight / (numLines - 1) / 2;
const dotDiameter = halfLineHeight * 2 * 0.3;

const color = '#000';

const durationNameToDuration = {
    'g': 1,
    '1': 1,
    'h': 2,
    '2': 2,
    'v': 4,
    '4': 4,
    'a': 8,
    '8': 8,
    '16': 16,
    '32': 32,
    '64': 64,
    '128': 128,
    '256': 256,
};

const drawStaff = (glyph, width) => {
    _.range(numLines)
        .map(idx => baseY - (idx * halfLineHeight * 2))
        .forEach(
            (y) => glyph
                .rect(width, 2)
                .fill(color)
                .move(0, y - 1)
                .back()
        );
}
    
const drawCenteredObject = (glyph, objectName, dy=0, doDrawStaff=true, margin=defaultMargin) => {
    const path = glyph.path(paths[objectName]).stroke({ color: color, width: 0 });
    const left = margin;
    const top = sizeY / 2 - path.height() / 2 + dy;
    path.transform({
        translate: {
            x: left,
            y: top,
        },
    });
    if (doDrawStaff) {
        drawStaff(glyph, path.width() + 2 * margin);
    }
    return {
        left: left,
        top: top,
        right: left + path.width(),
        bottom: top + path.height(),
        width: path.width(),
        height: path.height(),
        xCenter: left + path.width() / 2,
        yCenter: top + path.height() / 2,
    };
};

const drawObjectOnLine = (glyph, objectName, x, line, xCentered=true, dy=0) => {
    const path = glyph.path(paths[objectName]).stroke({ color: color, width: 0 });
    const left = x - (xCentered ? path.width() / 2 : 0);
    const top = baseY - line * halfLineHeight - path.height() / 2 + dy;
    path.transform({
        translate: {
            x: left,
            y: top,
        },
    });
    return {
        left: left,
        top: top,
        right: left + path.width(),
        bottom: top + path.height(),
        width: path.width(),
        height: path.height(),
        xCenter: left + path.width() / 2,
        yCenter: top + path.height() / 2,
    };
}

const drawAccidental = (glyph, noteLine, accidental) => {
    const accidentalToObjectNameMap = {
        es: 'flat',
        b: 'flat',
        is: 'sharp',
        '#': 'sharp',
        '§': 'natural',
    };
    const objectName = accidentalToObjectNameMap[accidental];
    return drawObjectOnLine(glyph, objectName, 0, noteLine, false, objectName === 'flat' ? -16 : 0)
        .right;
}

const drawLedgerLines = (glyph, noteLine, xCenter) => {
    const ledgerWidth = 50;
    var positions = [];
    if (noteLine < 0) {
        positions = _.range(-2, noteLine - 1, -2);
    } else if (noteLine > 8) {
        positions = _.range(10, noteLine + 1, 2);
    }
    positions
        .map(position => baseY - (position * halfLineHeight))
        .forEach(y => glyph
            .rect(ledgerWidth, 2)
            .fill(color)
            .move(xCenter - ledgerWidth / 2, y - 1)
            .back()
        );
}

const drawStemAndFlags = (glyph, noteDimensions, durationName, rotate) => {
    const duration = durationNameToDuration[durationName];
    if (duration <= 1) {
        return noteDimensions.top;
    }

    const subFlagDY = 16;
    const numFlags = Math.max(Math.log2(duration) - 2, 0);
    const stemLength = minStemLength + Math.max(numFlags - 2, 0) * subFlagDY;

    const stemWidth = 2;
    const stemDX = rotate ? 0 : noteDimensions.width - stemWidth;
    const stemDY = rotate ? -3  : stemLength + 3;
    const stemPath = glyph.rect(stemWidth, stemLength).fill(color)
        .transform({
            translate: {
                x: noteDimensions.left + stemDX,
                y: noteDimensions.yCenter - stemDY,
            },
        });
    const stemTransform = stemPath.transform();
    const top = stemTransform.translateY - (rotate ? halfLineHeight : 0);

    if (numFlags > 0) {
        const numSubFlags = Math.max(numFlags - 1, 0);
        const flagX = noteDimensions.left + (rotate ? stemWidth : noteDimensions.width);
        const flagBaseY = stemTransform.translateY + (rotate ? stemLength : 0);
        const flipFlag = rotate ? 'y' : false;

        _.range(numSubFlags)
            .map(idx => subFlagDY * idx)
            .forEach(dy => {
                const subFlagPath = glyph.path(paths['subFlag']).stroke({ color: color, width: 0 });
                subFlagPath.transform({
                    translate: {
                        x: flagX,
                        y: flagBaseY - (rotate ? subFlagPath.height() : 0) + (rotate ? -1 : 1) * dy
                    },
                    flip: flipFlag,
                });
            });

        const mainFlagPath = glyph.path(paths['mainFlag']).stroke({ color: color, width: 0 });
        mainFlagPath.transform({
            translate: {
                x: flagX,
                y: flagBaseY - (rotate ? mainFlagPath.height() : 0) + (rotate ? -1 : 1) * numSubFlags * subFlagDY
            },
            flip: flipFlag,
        });
    }
    return top;
}

const drawDot = (glyph, noteLine, noteDimensions, rotate) => {
    const dotDistance = 7;
    const dotX = noteDimensions.right + dotDistance;
    const dotDY = (noteLine % 2 === 0) ? (rotate ? 1 : -1) * halfLineHeight : 0;
    glyph.circle(dotDiameter).fill(color)
        .move(
            dotX,
            noteDimensions.yCenter - dotDiameter / 2 + dotDY
        );
}

const drawArticulation = (glyph, articulation, noteLine, noteDimensions, rotate, top) => {
    const x = noteDimensions.xCenter;
    if (articulation === '!' || articulation === '_') {
        const dLineY = (rotate ? 1 : -1) * ((noteLine % 2 === 0 && noteLine > 0 && noteLine < 8) ? 3 : 2);
        const y = baseY - halfLineHeight * (noteLine + dLineY);
        if (articulation === '!') {
            glyph.circle(dotDiameter)
                .fill(color)
                .move(
                    x - dotDiameter / 2,
                    y - dotDiameter / 2
                );
        } else {
            const width = 25;
            const height = 2;
            glyph.rect(width, height)
                .fill(color)
                .transform({
                    translate: {
                        x: x - width / 2,
                        y: y - height / 2,
                    },
                });
        }
    } else {
        const objectNameMap = {
            '?': 'fermata',
            '>': 'accent',
        };
        const verticalDistance = halfLineHeight + 2;
        const yBottom = Math.min(top, baseY - staffHeight) - verticalDistance;
        const objectPath = glyph.path(paths[objectNameMap[articulation]]).stroke({ color: color, width: 0 });
        objectPath.transform({
            translate: {
                x: x - objectPath.width() / 2,
                y: yBottom - objectPath.height(),
            },
        });
    }
}

const drawNote = (glyph, noteAttributes, margin=defaultMargin) => {
    const noteNameToNumber = [...'cdefgah']
        .reduce((nameToNumberMap, note, idx) => {
                return {
                    [note]: idx,
                    ...nameToNumberMap,
                }
            }, {}
        );
    const defaultNoteDuration = 'v';

    if (noteAttributes.name === 'b') {
        noteAttributes.name = 'h';
        noteAttributes.accidental = 'es';
    } else if (noteAttributes.name === 'B') {
        noteAttributes.name = 'H';
        noteAttributes.accidental = 'es';
    }
    if (noteAttributes.accidental === 's') {
        noteAttributes.accidental = 'es';
    }

    const noteValue = noteNameToNumber[noteAttributes.name.toLowerCase()];
    var octave = 1;
    if (noteAttributes.octave !== undefined) {
        octave = parseInt(noteAttributes.octave);
    }
    if (noteAttributes.name === noteAttributes.name.toUpperCase()) {
        octave = (octave - 1) * -1;
    }

    const noteLine = noteValue + Object.keys(noteNameToNumber).length * (octave - 1) - 2;
    const duration = noteAttributes.duration || defaultNoteDuration;
    const rotate = noteLine > 3 ? true : false;

    const group = glyph.group();

    var accidentalRight = 0;
    if (noteAttributes.accidental) {
        const accidentalDistance = 7;
        accidentalRight = drawAccidental(group, noteLine, noteAttributes.accidental) + accidentalDistance;
    }
    const noteObjectName = paths.hasOwnProperty(`${duration}Note`) ? `${duration}Note` : 'vNote';
    const noteDimensions = drawObjectOnLine(group, noteObjectName, accidentalRight, noteLine, false);
    drawLedgerLines(group, noteLine, noteDimensions.xCenter);

    const top = drawStemAndFlags(group, noteDimensions, duration, rotate);
    if (noteAttributes.dotted) {
        drawDot(group, noteLine, noteDimensions, rotate);
    }

    if (noteAttributes.articulation) {
        drawArticulation(group, noteAttributes.articulation, noteLine, noteDimensions, rotate, top);
    }

    group.transform({
        translate: {
            x: -1 * group.x() + margin,
            y: 0,
        },
    });
    drawStaff(glyph, group.width() + 2 * margin);
}

const drawRest = (glyph, durationName, dotted, margin=defaultMargin) => {
    var right;
    var rightForDot;
    if (durationName === 'g' || durationName === 'h') {
        const width = 25;
        const height = halfLineHeight * 0.9;

        drawStaff(glyph, width + 2 * margin);
        const y = sizeY / 2 - (durationName === 'g' ? 2 * halfLineHeight : height);
        glyph.rect(width, height)
            .fill(color)
            .transform({
                translate: {
                    x: margin,
                    y: y,
                },
            });
        right = margin + width;
    } else if (durationName === 'v') {
        right = drawCenteredObject(glyph, 'quarterRest', -2, false)
            .right;
    } else {
        const duration = durationNameToDuration[durationName];
        const numQuaverRests = Math.max(Math.log2(duration) - 2, 0);
        const startLine = 2 * (3 - Math.ceil(numQuaverRests / 2))
        right = _.range(numQuaverRests)
            .reduce((_, idx) => {
                const currentLine = startLine + 2 * idx;
                const currentRight = drawObjectOnLine(glyph, 'quaverRest', margin + idx * 7.05, currentLine, false)
                    .right;
                if (currentLine === 4) {
                    rightForDot = currentRight;
                }
                return currentRight;
            }, margin);
    }

    if (dotted) {
        const dotDistance = 10;
        const dotX = (rightForDot || right) + dotDistance;
        glyph.circle(dotDiameter)
            .fill(color)
            .move(
                dotX,
                baseY - 5 * halfLineHeight - dotDiameter / 2
            );
        right = Math.max(right, dotX + dotDiameter);
    }

    drawStaff(glyph, right + margin);
}

const drawBarline = (glyph, numBarlines) => {
    var width;
    glyph.rect(2, staffHeight).fill(color).move(0, baseY - staffHeight);
    if (numBarlines === 2) {
        width = 20;
        glyph.rect(2, staffHeight).fill(color).move(width - 2, baseY - staffHeight);
    } else if (numBarlines === 3) {
        width = 19;
        const thickLineWidth = 10;
        const thinLineWidth = 2;
        glyph.rect(thickLineWidth, staffHeight).fill(color).move(width - thickLineWidth, baseY - staffHeight);
        glyph.rect(thinLineWidth, staffHeight).fill(color).move(0, baseY - staffHeight);
    }
    if (width) {
        drawStaff(glyph, width);
    }
}

const drawClef = (glyph, type, margin=defaultMargin) => {
    const clefTypeSynonymsMap = {
        v: 'g',
        b: 'f',
    };
    type = type.toLowerCase();
    type = clefTypeSynonymsMap[type] || type;

    const clefDYMap = {
        g: 4,
        f: -11,
    }
    drawCenteredObject(glyph, `${type}Clef`, clefDYMap[type] || 0, true, margin);
}

const drawTimeSignature = (glyph, times, margin=defaultMargin) => {
    const group = glyph.group();
    drawObjectOnLine(group, times[0], 0, 6, true);
    drawObjectOnLine(group, times[1], 0, 2, true);
    group.transform({
        translate: {
            x: -1 * group.x() + margin,
            y: 0,
        },
    });
    drawStaff(glyph, group.width() + 2 * margin);
}

const drawKeySignature = (glyph, keySignature, margin=defaultMargin) => {
    const keySignatureToSymbolsMap = {
        gdur: 1,
        emoll: 1,
        ddur: 2,
        hmoll: 2,
        adur: 3,
        fismoll: 3,
        edur: 4,
        cismoll: 4,
        hdur: 5,
        gismoll: 5,
        fisdur: 6,
        dismoll: 6,
        cisdur: 7,
        aismoll: 7,
        fdur: -1,
        dmoll: -1,
        bdur: -2,
        gmoll: -2,
        esdur: -3,
        cmoll: -3,
        asdur: -4,
        fmoll: -4,
        desdur: -5,
        bmoll: -5,
        gesdur: -6,
        esmoll: -6,
        cesdur: -7,
        asmoll: -7,
    };
    const symbols = keySignatureToSymbolsMap[keySignature.toLowerCase()];
    const symbolName = symbols > 0 ? 'sharp' : 'flat'
    const linesMap = {
        sharp: [8, 5, 9, 6, 3, 7, 4],
        flat: [4, 7, 3, 6, 2, 5, 1],
    };
    const right = linesMap[symbolName]
        .slice(0, Math.abs(symbols))
        .reduce((lastRight, line) => {
            return drawObjectOnLine(glyph, symbolName, lastRight, line, false, symbolName === 'flat' ? -16 : 0)
                .right;
        }, margin);
    drawStaff(glyph, right + margin);
}

const drawRepeatSign = (glyph, repeatSign, margin=defaultMargin) => {
    const left = repeatSign === '(';
    const thickLineWidth = 10;
    const thinLineWidth = 2;
    const thinLineDx = 17;
    const width = thinLineDx + 2 * dotDiameter + margin;
    drawStaff(glyph, width);
    glyph.rect(thickLineWidth, staffHeight).fill(color).move(left ? 0 : width - thickLineWidth, baseY - staffHeight);
    glyph.rect(thinLineWidth, staffHeight).fill(color).move(left ? thinLineDx : width - thinLineDx - thinLineWidth, baseY - staffHeight);
    const dotX = left ? thinLineDx + dotDiameter : width - thinLineDx - 2 * dotDiameter;
    glyph.circle(dotDiameter).fill(color).move(dotX, baseY - 3 * halfLineHeight - dotDiameter / 2);
    glyph.circle(dotDiameter).fill(color).move(dotX, baseY - 5 * halfLineHeight - dotDiameter / 2);
}

const generateGlyph = (canvas, glyphStr, margin=defaultMargin) => {
    const glyph = canvas.group();

    const dottedRegex = '(?<dotted>[p.])?';

    const noteNameAccidentalRegexes = [
        '(?<name>[cdefgahCDEFGAH])(?<accidental>(es)|(is))?',
        '(?<name>[eaEA])(?<accidental>s)?',
        '(?<name>[bB])',
        '(?<accidental>[#b§]?)(?<name>[cdefgahCDEFGAH])',
    ];
    const noteOctaveRegex = '(?<octave>[0-3])?';
    const noteDurationRegex = '(?<duration>[ghva8]|16|32|64|128|256)?';
    const noteArticulationRegex = '(?<articulation>[!_?>])?';
    const noteRegexes = noteNameAccidentalRegexes
        .map(noteNameRegex => new RegExp('^' + noteNameRegex + noteOctaveRegex + noteDurationRegex + dottedRegex + noteArticulationRegex + '$'));
    const noteMatch = noteRegexes
        .map(noteRegex => glyphStr.match(noteRegex))
        .reduce(
            (allMatch, currentMatch) =>  allMatch || currentMatch,
            undefined
        );

    const restRegex = new RegExp('^p(?<duration>[g1h2v4a8]|16|32|64|128|256)?' + dottedRegex + '$', 'i');
    const restMatch = glyphStr.match(restRegex);

    const barlineRegex = /^[/]{1,3}|[|]{1,3}|,{1,3}$/;
    const barlineMatch = glyphStr.match(barlineRegex);

    const clefRegex = /^(?<type>[vgfbcn])s$/i;
    const clefMatch = glyphStr.match(clefRegex);

    const timeSignatureRegex = /^(?<times>31|32|22|24|34|44|54|64|74|84|28|38|48|58|68|78|88|98)(t|takt)?$/i;
    const timeSignatureMatch = glyphStr.match(timeSignatureRegex);

    const keySignatureRegex = /([defgah]|cis|fis|ces|des|es|ges|as)dur|([cdefghb]|cis|dis|fis|gis|ais|es|as)moll/i;
    const keySignatureMatch = glyphStr.match(keySignatureRegex);

    const emptyStaffWidth = 10;
    if (glyphStr === '-') {
        drawStaff(glyph, emptyStaffWidth);
    } else if (glyphStr === '—') {
        drawStaff(glyph, 2 * emptyStaffWidth);
    } else if (noteMatch) {
        drawNote(glyph, noteMatch.groups, margin);
    } else if (restMatch) {
        const defaultRestDuration = 'v';
        drawRest(glyph, restMatch.groups.duration || defaultRestDuration, restMatch.groups.dotted, margin);
    } else if (barlineMatch) {
        drawBarline(glyph, glyphStr.length);
    } else if (clefMatch) {
        drawClef(glyph, clefMatch.groups.type, margin);
    } else if (timeSignatureMatch) {
        drawTimeSignature(glyph, timeSignatureMatch.groups.times, margin);
    } else if (keySignatureMatch) {
        drawKeySignature(glyph, glyphStr, margin);
    } else if (glyphStr === '(' || glyphStr === ')') {
        drawRepeatSign(glyph, glyphStr, margin);
    } else if (glyphStr.toLowerCase() === '44c') {
        drawCenteredObject(glyph, 'commonTime', 0, true, margin);
    } else if (glyphStr.toLowerCase() === 'ab' || glyphStr.toLowerCase() === 'allabreve') {
        drawCenteredObject(glyph, 'allaBreve', 0, true, margin);
    } else {
        return null;
    }

    return {
        width: glyph.width(),
        height: sizeY,
    };
}

module.exports = generateGlyph;
