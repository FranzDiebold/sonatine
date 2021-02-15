import { useState, useEffect } from 'react';

import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';

import { SVG } from '@svgdotjs/svg.js'

import Form from './Form';

import { getAllGlyphNames } from '../../lib/allGlyphNames';
import generateGlyph from '../../lib/glyphGenerator';

import './MusicalSymbolsExplorer.scss';

const alternativeLigaturesMap = getAllGlyphNames()
  .reduce((altLigaMap, ligaturesList) => {
    ligaturesList.forEach(ligature => altLigaMap[ligature] = ligaturesList);
    return altLigaMap;
  },
    {}
  );

function MusicalSymbolsExplorer() {
  const [glyphStr, setGlyphStr] = useState('c');
  const [glyph, setGlyph] = useState(null);

  useEffect(() => {
    const canvas = SVG();
    const glyphSize = generateGlyph(canvas, glyphStr);
    if (glyphSize) {
      canvas.size(glyphSize.width, glyphSize.height);
      setGlyph(canvas.svg());
    } else {
      setGlyph(null);
    }
  }, [glyphStr]);

  return (
    <Container>
      <Columns>
        <Columns.Column size={4} className="has-text-centered">
          <div className="glyph-container">
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(glyph)}`}
              alt={`Zeichen ${glyphStr}`}
            />
          </div>
          <div>
            <span className="ligatures-container has-tooltip-bottom" data-tooltip="Mögliche Eingaben des Zeichens">
              {
                (alternativeLigaturesMap[glyphStr] || [])
                  .map(ligature => (
                    <span key={ligature} className="ligature">{ligature}</span>
                  ))
              }
            </span>
          </div>
        </Columns.Column>
        <Columns.Column size={8}>
          <Form onChange={setGlyphStr} />
        </Columns.Column>
      </Columns>
    </Container>
  );
}

export default MusicalSymbolsExplorer;
