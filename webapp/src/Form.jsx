import { useState } from 'react';

import Tabs from 'react-bulma-components/lib/components/tabs';
import Columns from 'react-bulma-components/lib/components/columns';
import { Field, Label, Control, Radio, Checkbox } from 'react-bulma-components/lib/components/form';

function NoteForm(props) {
  const [state, setState] = useState(props.state);

  function onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newState = {
      ...state,
      [target.name]: value
    };
    setState(newState);
    props.onChange({
      name: 'note',
      value: newState,
    });
  }

  return (
    <Columns>
      <Columns.Column narrow>
        <Field>
          <Label>Versetzungszeichen</Label>
          <Control>
            {
              [
                ['', ''],
                ['#', '#'],
                ['b', 'b'],
                ['§', 'Auflösungszeichen'],
              ].map(accidentalPrefix =>
                <div key={accidentalPrefix[0]}>
                  <Radio
                    name="accidentalPrefix"
                    value={accidentalPrefix[0]}
                    checked={state.accidentalPrefix === accidentalPrefix[0]}
                    onChange={onChange}
                  >
                    {accidentalPrefix[1]}
                  </Radio>
                </div>
              )
            }
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>Note</Label>
          <Control>
            {[...'cdefgah'].map(name =>
              <div key={name}>
                <Radio
                  name="name"
                  value={name}
                  checked={state.name === name}
                  onChange={onChange}
                >
                  {name}
                </Radio>
              </div>
            )}
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>Oktave</Label>
          <Control>
            {[''].concat([...'1234']).map(octave =>
              <div key={octave}>
                <Radio
                  name="octave"
                  value={octave}
                  checked={state.octave === octave}
                  onChange={onChange}
                >
                  {octave}
                </Radio>
              </div>
            )}
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>Länge</Label>
          <Control>
            {
              [
                ['', '-'],
                ['g', 'ganz'],
                ['h', 'halb'],
                ['v', 'viertel'],
                ['a', 'achtel'],
                ['16', '16tel'],
                ['32', '32tel'],
                ['64', '64tel']
              ].map(duration =>
                <div key={duration[0]}>
                  <Radio
                    name="duration"
                    value={duration[0]}
                    checked={state.duration === duration[0]}
                    onChange={onChange}
                  >
                    {duration[1]}
                  </Radio>
                </div>
              )
            }
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>Punktiert</Label>
          <Control>
            <Checkbox checked={state.dotted} onChange={onChange} name="dotted" />
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>Artikulation</Label>
          <Control>
            {
              [
                ['', ''],
                ['!', 'Staccato'],
                ['_', 'Portato'],
                ['?', 'Fermate'],
                ['>', 'Akzent'],
              ].map(articulation =>
                <div key={articulation[0]}>
                  <Radio
                    name="articulation"
                    value={articulation[0]}
                    checked={state.articulation === articulation[0]}
                    onChange={onChange}
                  >
                    {articulation[1]}
                  </Radio>
                </div>
              )
            }
          </Control>
        </Field>
      </Columns.Column>
    </Columns>
  );
}

function RestForm(props) {
  const [state, setState] = useState(props.state);

  function onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newState = {
      ...state,
      [target.name]: value
    };
    setState(newState);
    props.onChange({
      name: 'rest',
      value: newState,
    });
  }

  return (
    <Columns>
      <Columns.Column narrow>
        <Field>
          <Label>Länge</Label>
          <Control>
            {
              [
                ['', '-'],
                ['g', 'ganz'],
                ['h', 'halb'],
                ['v', 'viertel'],
                ['a', 'achtel'],
                ['16', '16tel'],
                ['32', '32tel'],
                ['64', '64tel']
              ].map(duration =>
                <div key={duration[0]}>
                  <Radio
                    name="duration"
                    value={duration[0]}
                    checked={state.duration === duration[0]}
                    onChange={onChange}
                  >
                    {duration[1]}
                  </Radio>
                </div>
              )
            }
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>Punktiert</Label>
          <Control>
            <Checkbox checked={state.dotted} onChange={onChange} name="dotted" />
          </Control>
        </Field>
      </Columns.Column>
    </Columns>
  );
}

function KeySignatureForm(props) {
  const [state, setState] = useState(props.state);

  function onChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const newState = {
      ...state,
      [target.name]: value
    };
    setState(newState);
    props.onChange({
      name: 'keySignature',
      value: newState,
    });
  }

  return (
    <Columns>
      <Columns.Column narrow>
        <Field>
          <Label>Länge</Label>
          <Control>
            {
              [
                ['', '-'],
                ['g', 'ganz'],
                ['h', 'halb'],
                ['v', 'viertel'],
                ['a', 'achtel'],
                ['16', '16tel'],
                ['32', '32tel'],
                ['64', '64tel']
              ].map(duration =>
                <div key={duration[0]}>
                  <Radio
                    name="duration"
                    value={duration[0]}
                    checked={state.duration === duration[0]}
                    onChange={onChange}
                  >
                    {duration[1]}
                  </Radio>
                </div>
              )
            }
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>Punktiert</Label>
          <Control>
            <Checkbox checked={state.dotted} onChange={onChange} name="dotted" />
          </Control>
        </Field>
      </Columns.Column>
    </Columns>
  );
}

function Form(props) {
  const [state, setState] = useState({
    activeTabIdx: 0,
    note: {
      accidentalPrefix: '',
      name: 'c',
      octave: '',
      duration: '',
      dotted: false,
      articulation: '',
    },
    rest: {
      duration: '',
      dotted: false,
    },
    KeySignature: {

    },
  });

  function stateToGlyphStr(state) {
    if (state.activeTabIdx ===  0) {
      return `${state.note.accidentalPrefix}${state.note.name}${state.note.octave}${state.note.duration}${state.note.dotted ? 'p' : ''}${state.note.articulation}`;
    } else if (state.activeTabIdx ===  1) {
      return `p${state.rest.duration}${state.rest.dotted ? 'p' : ''}`;
    } else {
      return '';
    }
  }

  function onChange(event) {
    const newState = {
      ...state,
      [event.name]: event.value,
    };
    setState(newState);
    props.onChange(stateToGlyphStr(newState));
  }

  const tabs = [
    {
      title: 'Noten',
      content: <NoteForm state={state.note} onChange={onChange} />,
    },
    {
      title: 'Pausen',
      content: <RestForm state={state.rest} onChange={onChange} />,
    },
    {
      title: 'Notenschlüssel',
      content: null,
    },
    {
      title: 'Vorzeichen',
      content: <KeySignatureForm state={state.KeySignature} onChange={onChange} />,
    },
    {
      title: 'Taktangaben',
      content: null,
    },
    {
      title: 'Weitere Symbole',
      content: null,
    }
  ];

  return (
    <>
      <Tabs>
        {
          tabs.map((tab, idx) =>
            <Tabs.Tab
              key={idx} active={state.activeTabIdx === idx}
              onClick={() => onChange({name: 'activeTabIdx', value: idx})}
            >
              {tab.title}
            </Tabs.Tab>
          )
        }
      </Tabs>
      {tabs[state.activeTabIdx].content}
    </>
  );
}

export default Form;
