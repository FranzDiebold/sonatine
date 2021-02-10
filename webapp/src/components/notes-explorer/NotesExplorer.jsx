import { useState, useEffect } from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';

import { SVG } from '@svgdotjs/svg.js'

import Form from './Form';

import { getAllGlyphNames } from '../../lib/allGlyphNames';
import generateGlyph from '../../lib/glyphGenerator';

import './NotesExplorer.scss';

const alternativeLigaturesMap = getAllGlyphNames()
  .reduce((altLigaMap, ligaturesList) => {
    ligaturesList.forEach(ligature => altLigaMap[ligature] = ligaturesList);
    return altLigaMap;
  },
    {}
  );

function NotesExplorer() {
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
    <>
      <Section>
        <Container className="has-text-centered">
          <div className="glyph-container">
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(glyph)}`}
              alt={`Zeichen ${glyphStr}`}
            />
          </div>
          <div>
            <span className="glyph-string has-tooltip-bottom" data-tooltip="Mögliche Eingaben des Zeichens">
              {(alternativeLigaturesMap[glyphStr] || []).join(', ')}
            </span>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Form onChange={setGlyphStr} />
        </Container>
      </Section>
    </>
  );
}

export default NotesExplorer;
