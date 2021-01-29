const getAllNoteVariations = () => {
    const accidentalSigns = [...'#b§'];
    const accidentalSuffixes = ['is', 'es'];
    const noteNames = [...'cdefgah'];
    const allNoteNames = noteNames.concat(noteNames.map(n => n.toUpperCase()));
    const allNoteNamesWithAccidentals = allNoteNames.concat(
        accidentalSigns.flatMap(a => allNoteNames.map(n => a + n)),
        allNoteNames.flatMap(n => accidentalSuffixes.map(s => n + s)),
        ['b', 'B'],
        ['es', 'as', 'Es', 'As'],
    );

    const octaves = [''].concat([...'0123']);
    const durations = [''].concat([...'ghva8'], ['16', '32', '64']); // , '128', '256'
    const dottedVariations = [''].concat([...'p.']);
    const articulations = [''].concat([...'!_?>']);

    const allNoteVariations = allNoteNamesWithAccidentals.flatMap(
        note => octaves.flatMap(
            octave => durations.flatMap(
                duration => dottedVariations.flatMap(
                    dotted => articulations.map(
                        articulation => note + octave + duration + dotted + articulation
                    )
                )
            )
        )
    );
    return allNoteVariations;
}

const getAllRestVariations = () => {
    const restNames = ['P', 'p'];
    const durations = [''].concat([...'g1h2v4a8'], ['16', '32', '64']); // , '128', '256'
    const dottedVariations = [''].concat([...'p.']);
    const allRestVariations = restNames.flatMap(
        rest => durations.flatMap(
            duration => dottedVariations.map(
                dotted => rest + duration + dotted
            )
        )
    );
    return allRestVariations;
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getAllOtherGlyphNames = () => {
    const staff = ['-', '—'];
    const barlines = ['/', '|', ','].flatMap(
        char => [1, 2, 3].map(
            num => char.repeat(num)
        )
    );
    const clefs = [...'vgfbcn']
        .map(c => `${c}s`)
        .flatMap(c => [c, c.toUpperCase()]);
    const timeSignatures = [
        '31', '32', '22', '24', '34', '44', '54', '64', '74',
        '84', '28', '38', '48', '58', '68', '78', '88', '98'
    ].flatMap(
        t => ['', 'Takt', 'takt', 'T', 't'].map(
            s => t + s
        )
    );

    const majorKeySignatures = [...'defgah'].concat(['cis', 'fis', 'ces', 'des', 'es', 'ges', 'as'])
        .flatMap(key => [key, capitalizeFirstLetter(key)])
        .flatMap(
            key => ['dur', 'Dur'].map(
                suffix => key + suffix
            )
        );
    const minorKeySignatures = [...'cdefghb'].concat(['cis', 'dis', 'fis', 'gis', 'ais', 'es', 'as'])
        .flatMap(key => [key, capitalizeFirstLetter(key)])
        .flatMap(
            key => ['moll', 'Moll'].map(
                suffix => key + suffix
            )
        );
    const keySignatures = majorKeySignatures.concat(minorKeySignatures);

    const repeatSigns = ['(', ')'];
    const specialTimeSignatures = [
        '44c', '44C',
        'ab', 'allabreve', 'AllaBreve', 'AB', 'aB', 'Ab',
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

const getAllCharacters = () => getAllGlyphNames().filter(glyphName => glyphName.length == 1);
const getAllLigatures = () => getAllGlyphNames().filter(glyphName => glyphName.length > 1);

module.exports = {
    getAllCharacters,
    getAllLigatures,
    getAllGlyphNames,
};
