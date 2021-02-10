import { useState } from 'react';

import Section from 'react-bulma-components/lib/components/section';
import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import { Field, Control, Label, Textarea } from 'react-bulma-components/lib/components/form';

import './FontTest.scss';

function FontTest() {
  const [text, setText] = useState('/-vs-###-34-(-c-d-e--/--f-g-a--/--h--ph-)');

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
                      autoFocus
                    />
                  </Control>
                </Field>
              </Columns.Column>
              <Columns.Column size={7}>
                <div className="notes">
                  {text}
                </div>
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
      </Hero>
    </Section>
  );
}

export default FontTest;
