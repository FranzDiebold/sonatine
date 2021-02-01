require('lodash.product');
let _ = require('lodash');

const getNotesWithAccidentals = (noteNames) => {
    const accidentalEquivalentsList = [[''], ['#', 'is'], ['b', 'es'], ['§']];
    return noteNames.flatMap(
        note => accidentalEquivalentsList.map(
            accidentalEquivalents => accidentalEquivalents.flatMap(
                accidental => {
                    const noteWithAccidentals = [accidental.length === 1 ? (accidental + note) : (note + accidental)];
                    const shortAccidental = ((note.toLowerCase() === 'e' || note.toLowerCase() === 'a') && accidental === 'es') ? [note + 's'] : [];
                    const specialAccidental = (note.toLowerCase() === 'h' && accidental === 'es') ? [note === 'h' ? 'b' : 'B'] : [];
                    return noteWithAccidentals.concat(shortAccidental, specialAccidental);
                }
            )
        )
    );
}

const getNoteNamesWithAccidentalsAndOctaves = (noteNames, octavesEquivalentsList) => {
    return getNotesWithAccidentals(noteNames)
    .flatMap(notesWithAccidentalEquivs => octavesEquivalentsList
        .map(octavesEquivalents => _.product(notesWithAccidentalEquivs, octavesEquivalents)
            .flatMap(elements => elements.join(''))
        )
    );
}

const getAllNoteVariations = () => {
    const smallNoteNames = [...'cdefgah'];
    const smallOctavesEquivalentsList = [['0'], ['', '1'], ['2'], ['3']];
    const smallNoteNamesWithAccidentalsAndOctaves = getNoteNamesWithAccidentalsAndOctaves(smallNoteNames, smallOctavesEquivalentsList);

    const largeNoteNames = smallNoteNames.map(n => n.toUpperCase());
    const largeOctavesEquivalentsList = [['0'], ['', '1']];
    const largeNoteNamesWithAccidentalsAndOctaves = getNoteNamesWithAccidentalsAndOctaves(largeNoteNames, largeOctavesEquivalentsList);

    const allNoteNamesWithAccidentalsAndOctaves = smallNoteNamesWithAccidentalsAndOctaves.concat(largeNoteNamesWithAccidentalsAndOctaves);

    const durationsEquivalentsList = [['g'], ['h'], ['', 'v'], ['a', '8'], ['16'], ['32'], ['64']]; // , ['128'], ['256']
    const dottedVariationsList = [[''], ['p', '.']];
    const articulations = [''].concat([...'!_?>']).map(a => [a]);

    const allNoteVariations = allNoteNamesWithAccidentalsAndOctaves
        .flatMap(noteWithAccidentalAndOctaveEquivs => durationsEquivalentsList
            .flatMap(durationEquivs => dottedVariationsList
                .flatMap(dottedVariations => articulations
                    .map(articulation => _.product(noteWithAccidentalAndOctaveEquivs, durationEquivs, dottedVariations, articulation)
                        .flatMap(elements => elements.join(''))
                    )
                )
            )
        );

    return allNoteVariations;
}

const getAllRestVariations = () => {
    const restNameVariations = ['P', 'p'];
    const durationEquivsList = [['g', '1'], ['h', '2'], ['', 'v', '4'], ['a', '8'], ['16'], ['32'], ['64']]; // , ['128'], ['256']
    const dottedVariationsList = [[''], ['p', '.']];
    const allRestVariations = durationEquivsList
        .flatMap(durationEquivs => dottedVariationsList
            .map(dottedVariations => _.product(restNameVariations, durationEquivs, dottedVariations)
                .flatMap(elements => elements.join(''))
            )
        );
    return allRestVariations;
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getAllOtherGlyphNames = () => {
    const staff = [['-'], ['—']];

    const barlines = [1, 2, 3].map(
        num => ['/', '|', ','].map(
            char => char.repeat(num)
        )
    );

    const clefs = [...'vgfbcn']
        .map(c => `${c}s`)
        .map(c => [c, c.toUpperCase()]);

    const timeSignatures = [
        '31', '32', '22', '24', '34', '44', '54', '64', '74',
        '84', '28', '38', '48', '58', '68', '78', '88', '98'
    ].map(
        t => ['', 'Takt', 'takt', 'T', 't'].map(
            s => t + s
        )
    );

    const majorKeySignatures = [...'defgah'].concat(['cis', 'fis', 'ces', 'des', 'es', 'ges', 'as'])
        .map(key => [key, capitalizeFirstLetter(key)])
        .map(
            keyEquivs => keyEquivs
                .flatMap(
                    key => ['dur', 'Dur'].map(
                        suffix => key + suffix
                    )
                )
        );
    const minorKeySignatures = [...'cdefghb'].concat(['cis', 'dis', 'fis', 'gis', 'ais', 'es', 'as'])
        .map(key => [key, capitalizeFirstLetter(key)])
        .map(
            keyEquivs => keyEquivs
                .flatMap(
                    key => ['moll', 'Moll'].map(
                        suffix => key + suffix
                    )
                )
        );
    const keySignatures = majorKeySignatures.concat(minorKeySignatures);

    const repeatSigns = [['('], [')']];

    const specialTimeSignatures = [
        ['44c', '44C'],
        ['ab', 'allabreve', 'AllaBreve', 'AB', 'aB', 'Ab']
    ];

    return staff.concat(
        barlines,
        clefs,
        timeSignatures,
        keySignatures,
        repeatSigns,
        specialTimeSignatures,
    );
}

const getAllGlyphNames = () => {
    return getAllNoteVariations().concat(
        getAllRestVariations(),
        getAllOtherGlyphNames(),
    );
}

// console.log(getAllGlyphNames().length);
// console.log(_.sum(getAllGlyphNames().map(g => g.length)));

module.exports = {
    getAllGlyphNames,
};
