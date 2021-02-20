import Section from 'react-bulma-components/lib/components/section';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import { Field, Control, Label, Textarea } from 'react-bulma-components/lib/components/form';
import Box from 'react-bulma-components/lib/components/box';

import useStateWithSesionStorage from '../../util/stateWithSessionStorage';

import './FontTest.scss';

const INITIAL_TEXT_STATE = 'vs-#-44c--gh---hh--/--eh.--p--/--a--h--c2--a--/-hh?--p--d2a--c2a--/\nvs-#--h---g---p--gaha--/--c2--e2--p--c2--/-dh?--ph--)'

function FontTest() {
  const [text, setText] = useStateWithSesionStorage(INITIAL_TEXT_STATE, 'musicalSymbolsFontTestState');

  function onChange(event) {
    setText(event.target.value);
  }

  return (
    <Section>
      <Hero>
        <Hero.Body>
          <Container>
            <Columns>
              <Columns.Column size={5}>
                <Field>
                  <Label>Eingabe</Label>
                  <Control>
                    <Textarea
                      placeholder="Test"
                      value={text}
                      onChange={onChange}
                      rows={13}
                      autoFocus
                    />
                  </Control>
                </Field>
              </Columns.Column>
              <Columns.Column size={7}>
                <Box>
                  <div className="musical-symbols">
                    {text}
                  </div></Box>
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
      </Hero>
    </Section>
  );
}

export default FontTest;
