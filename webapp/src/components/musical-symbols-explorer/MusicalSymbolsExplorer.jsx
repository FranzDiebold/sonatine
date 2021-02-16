import { useState, useEffect } from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';

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
    <Section>
      <Container>
        <Columns>
          <Columns.Column size={4} className="has-text-centered">
            <div className="glyph-container">
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(glyph)}`}
                alt={`Zeichen ${glyphStr}`}
              />
            </div>
            <div className="download-symbol-container">
              <Button
                renderAs="a"
                href={`data:image/svg+xml;utf8,${encodeURIComponent(glyph)}`}
                download={`${glyphStr}.svg`}
              >
                <Icon>
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                  </svg>
                </Icon>
                <span>
                  Symbol herunterladen (.svg)
              </span>
              </Button>
            </div>
            <div>
              <span className="ligatures-container">
                {
                  (alternativeLigaturesMap[glyphStr] || [])
                    .map(ligature => (
                      <span
                        key={ligature}
                        className="ligature has-tooltip-bottom"
                        data-tooltip="Zum Kopieren klicken."
                        onClick={() => { navigator.clipboard.writeText(ligature) }}
                      >
                        {ligature}
                      </span>
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
    </Section>
  );
}

export default MusicalSymbolsExplorer;
