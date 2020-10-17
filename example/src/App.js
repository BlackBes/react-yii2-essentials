import React, { useState, useEffect } from 'react'
import { InputField, TextArea, DropDownList, CheckBox, RadioButton } from 'react-yii2-essentials'
import store from './store'
import { Provider } from 'react-redux'
import 'react-yii2-essentials/src/styles.module.css'

const App = () => {
  const [text, setText] = useState(0)
  const [textOutValidation, setTextOutValidation] = useState('')
  const [textOutHelpBlock, setTextOutHelpBlock] = useState('')
  const [dropdownValue, setDropdownValue] = useState(0)
  const [checkBoxValues, setCheckBoxValues] = useState({ '1': false, '2': true, '3': false })
  const [aloneCheckbox, setAloneCheckbox] = useState({ '1': false })
  const [radiobuttonValue, setRadiobuttonValue] = useState('2')

  useEffect(() => {
    setTimeout(() => {
      setTextOutValidation(false);
      setTextOutHelpBlock('YAY, this is outer validation, bitch!');
    }, 5000)
  })

  return (
    <Provider store={store}>
      <div>
        {/*<IndexDataLoader />*/}
        {/*<TableLoader />*/}
        <InputField name={'address'} model={'clients'} label={''} class={'main-input'}
                    placeholder={'Адреса'} onChange={(event) => setText(event.target.value)}
                    value={text} validated={textOutValidation} helpBlock={textOutHelpBlock} />
        <TextArea name={'address'} model={'clients'} label={''} class={'main-input'}
                  placeholder={'Адреса'} onChange={(event) => setText(event.target.value)}
                  value={text} />
        <DropDownList name={'discount'} model={'clients'} label={''} class={'main-input'}
                      options={{ '1': 'Test1', '2yt': 'Test2', '3': 'Test3' }}
                      placeholder={'Адреса'} onChange={(event) => setDropdownValue(event.target.value)}
                      value={dropdownValue} />
        <CheckBox name={'discount'} model={'clients'} label={''} class={'main-input'}
                  options={{ '1': 'Test1', '2': 'Test2', '3': 'Test3' }}
                  placeholder={'Адреса'} onChange={(values) => setCheckBoxValues(values)}
                  values={checkBoxValues} />
        <CheckBox name={'discount'} model={'clients'} label={''} class={'main-input'}
                  options={{ '1': 'Test Alone Guy' }}
                  placeholder={'Адреса'} onChange={(values) => setAloneCheckbox(values)}
                  values={aloneCheckbox} />
        <RadioButton name={'discount'} model={'clients'} label={''} class={'main-input'}
                     options={{ '1': 'Test R 1', '2': 'Test R 2', '3': 'Test R 3' }}
                     placeholder={'Адреса'} onChange={(value) => setRadiobuttonValue(value)}
                     value={radiobuttonValue} />
      </div>
    </Provider>
  )
}

export default App
