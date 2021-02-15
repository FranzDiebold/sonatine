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
                ['', '-'],
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
            {
              [...'123']
                .map(octave =>
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
                )
            }
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>Länge</Label>
          <Control>
            {
              [
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
                ['', '-'],
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

function ClefForm(props) {
  const [state, setState] = useState(props.state);

  function onChange(event) {
    const target = event.target;
    const value = target.value;
    const newState = {
      ...state,
      [target.name]: value
    };
    setState(newState);
    props.onChange({
      name: 'clef',
      value: newState,
    });
  }

  return (
    <Columns>
      <Columns.Column narrow>
        <Field>
          <Label>Notenschlüssel</Label>
          <Control>
            {
              [
                ['g', 'Violinschlüssel (G-Schlüssel)'],
                ['f', 'Bassschlüssel (F-Schlüssel)'],
                ['c', 'Altschlüssel (C-Schlüssel)'],
                ['n', 'Neutraler Schlüssel'],
              ]
                .map(type =>
                  <div key={type[0]}>
                    <Radio
                      name="type"
                      value={type[0]}
                      checked={state.type === type[0]}
                      onChange={onChange}
                    >
                      {type[1]}
                    </Radio>
                  </div>
                )
            }
          </Control>
        </Field>
      </Columns.Column>
    </Columns >
  );
}

function KeySignatureForm(props) {
  const [state, setState] = useState(props.state);

  function onChange(event) {
    const target = event.target;
    const value = target.value;
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
          <Label>Anzahl</Label>
          <Control>
            {
              [...Array(7).keys()]
                .map(number => (number + 1).toString())
                .map(count =>
                  <div key={count}>
                    <Radio
                      name="count"
                      value={count}
                      checked={state.count === count}
                      onChange={onChange}
                    >
                      {count}
                    </Radio>
                  </div>
                )
            }
          </Control>
        </Field>
      </Columns.Column>
      <Columns.Column narrow>
        <Field>
          <Label>#/b</Label>
          <Control>
            {
              ['#', 'b']
                .map(type =>
                  <div key={type}>
                    <Radio
                      name="type"
                      value={type}
                      checked={state.type === type}
                      onChange={onChange}
                    >
                      {type}
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

function TimeSignatureForm(props) {
  const [state, setState] = useState(props.state);

  function onChange(event) {
    const target = event.target;
    const value = target.value;
    const newState = {
      ...state,
      [target.name]: value
    };
    setState(newState);
    props.onChange({
      name: 'timeSignature',
      value: newState,
    });
  }

  return (
    <Columns>
      <Columns.Column narrow>
        <Field>
          <Label>Taktangaben</Label>
          <Control>
            {
              [
                ['31', '3/1'],
                ['32', '3/2'],
                ['22', '2/2'],
                ['24', '2/4'],
                ['34', '3/4'],
                ['44', '4/4'],
                ['54', '5/4'],
                ['64', '6/4'],
                ['74', '7/4'],
                ['84', '8/4'],
                ['28', '2/8'],
                ['38', '3/8'],
                ['48', '4/8'],
                ['58', '5/8'],
                ['68', '6/8'],
                ['78', '7/8'],
                ['88', '8/8'],
                ['98', '9/8'],
                ['44c', 'Spezielle Taktvorschrift (= 4/4)'],
                ['ab', 'Alla breve (= 2/2)'],
              ]
                .map(type =>
                  <div key={type[0]}>
                    <Radio
                      name="type"
                      value={type[0]}
                      checked={state.type === type[0]}
                      onChange={onChange}
                    >
                      {type[1]}
                    </Radio>
                  </div>
                )
            }
          </Control>
        </Field>
      </Columns.Column>
    </Columns >
  );
}

function OtherSymbolForm(props) {
  const [state, setState] = useState(props.state);

  function onChange(event) {
    const target = event.target;
    const value = target.value;
    const newState = {
      ...state,
      [target.name]: value
    };
    setState(newState);
    props.onChange({
      name: 'otherSymbol',
      value: newState,
    });
  }

  return (
    <Columns>
      <Columns.Column narrow>
        <Field>
          <Label>Weitere Symbole</Label>
          <Control>
            {
              [
                ['-', 'Leere Notenlinie'],
                ['/', 'Taktstrich'],
                ['//', 'Doppelstrich'],
                ['///', 'Schlussstrich'],
                ['(', 'Wiederholungszeichen Anfang'],
                [')', 'Wiederholungszeichen Ende'],
              ]
                .map(symbol =>
                  <div key={symbol[0]}>
                    <Radio
                      name="symbol"
                      value={symbol[0]}
                      checked={state.symbol === symbol[0]}
                      onChange={onChange}
                    >
                      {symbol[1]}
                    </Radio>
                  </div>
                )
            }
          </Control>
        </Field>
      </Columns.Column>
    </Columns >
  );
}

function Form(props) {
  const [state, setState] = useState({
    activeTabIdx: 0,
    note: {
      accidentalPrefix: '',
      name: 'c',
      octave: '1',
      duration: 'v',
      dotted: false,
      articulation: '',
    },
    rest: {
      duration: 'v',
      dotted: false,
    },
    clef: {
      type: 'g',
    },
    keySignature: {
      count: '1',
      type: '#',
    },
    timeSignature: {
      type: '34',
    },
    otherSymbol: {
      symbol: '-',
    },
  });

  function stateToGlyphStr(state) {
    if (state.activeTabIdx === 0) {
      return `${state.note.accidentalPrefix}${state.note.name}${state.note.octave}${state.note.duration}${state.note.dotted ? 'p' : ''}${state.note.articulation}`;
    } else if (state.activeTabIdx === 1) {
      return `p${state.rest.duration}${state.rest.dotted ? 'p' : ''}`;
    } else if (state.activeTabIdx === 2) {
      return `${state.clef.type}s`;
    } else if (state.activeTabIdx === 3) {
      return `${state.keySignature.count}${state.keySignature.type}`;
    } else if (state.activeTabIdx === 4) {
      return `${state.timeSignature.type}`;
    } else if (state.activeTabIdx === 5) {
      return `${state.otherSymbol.symbol}`;
    } else {
      return '-';
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
      content: <ClefForm state={state.clef} onChange={onChange} />,
    },
    {
      title: 'Vorzeichen',
      content: <KeySignatureForm state={state.keySignature} onChange={onChange} />,
    },
    {
      title: 'Taktangaben',
      content: <TimeSignatureForm state={state.timeSignature} onChange={onChange} />,
    },
    {
      title: 'Weitere Symbole',
      content: <OtherSymbolForm state={state.otherSymbol} onChange={onChange} />,
    }
  ];

  return (
    <>
      <Tabs>
        {
          tabs.map((tab, idx) =>
            <Tabs.Tab
              key={idx} active={state.activeTabIdx === idx}
              onClick={() => onChange({ name: 'activeTabIdx', value: idx })}
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
