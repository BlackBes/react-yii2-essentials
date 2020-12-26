import React, { useState, useEffect } from 'react'
import { InputField, TextArea, DropDownList, CheckBox, RadioButton, DataProvider, PhonePicker, DatePicker, DataView, BreadCrumbs, PrepareIndexModal } from 'react-yii2-essentials'
import store from './store'
import { Provider } from 'react-redux'
import 'react-yii2-essentials/src/styles.module.css'
import 'react-yii2-essentials/src/App.css'
import 'react-phone-number-input/style.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const [text, setText] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [date, setDate] = useState('')
  const [textOutValidation, setTextOutValidation] = useState('')
  const [textOutHelpBlock, setTextOutHelpBlock] = useState('')
  const [dropdownValue, setDropdownValue] = useState({ value: '2', label: 'Test 1' })
  const [checkBoxValues, setCheckBoxValues] = useState({ '1': false, '2': true, '3': false })
  const [aloneCheckbox, setAloneCheckbox] = useState({ '1': false })
  const [radiobuttonValue, setRadiobuttonValue] = useState('2')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTextOutValidation(false)
      setTextOutHelpBlock('YAY, this is outer validation, bitch!')
    }, 5000)
  })

  const dummyModel = [
      {
        "id": 12,
        "name": "sdffsd",
        "is_delete": 1,
        "created_at": "2020-12-25 10:42:24",
        "updated_at": "2020-12-25 10:42:24",
        "page_limit": 10
      },
      {
        "id": 11,
        "name": "sdfsdf",
        "is_delete": 1,
        "created_at": "2020-12-25 10:42:20",
        "updated_at": "2020-12-25 10:42:20",
        "page_limit": 10
      },
      {
        "id": 10,
        "name": "sdfsdf",
        "is_delete": 0,
        "created_at": "2020-12-25 10:41:52",
        "updated_at": "2020-12-25 10:41:52",
        "page_limit": 10
      },
      {
        "id": 9,
        "name": "sfdsdf",
        "is_delete": 0,
        "created_at": "2020-12-25 10:41:42",
        "updated_at": "2020-12-25 10:41:42",
        "page_limit": 10
      },
      {
        "id": 8,
        "name": "sdfsdf",
        "is_delete": 0,
        "created_at": "2020-12-25 10:41:39",
        "updated_at": "2020-12-25 10:41:39",
        "page_limit": 10
      },
      {
        "id": 7,
        "name": "sdfsdfds",
        "is_delete": 0,
        "created_at": "2020-12-25 10:41:30",
        "updated_at": "2020-12-25 10:41:30",
        "page_limit": 10
      },
      {
        "id": 6,
        "name": "gfd",
        "is_delete": 0,
        "created_at": "2020-12-25 10:39:38",
        "updated_at": "2020-12-25 10:39:38",
        "page_limit": 10
      },
      {
        "id": 2,
        "name": "client",
        "is_delete": 0,
        "created_at": "2020-12-22 14:15:19",
        "updated_at": "2020-12-25 10:31:04",
        "page_limit": 10
      },
      {
        "id": 1,
        "name": "admin",
        "is_delete": 0,
        "created_at": "2020-12-22 14:15:06",
        "updated_at": "2020-12-22 14:15:06",
        "page_limit": 10
      }
  ]

  const modalCallbacks = () => {
    return {
      onClose: ()=>{},
      onDelete: ()=>{},
      onRestore: ()=>{},
    }
  }
  return (
    <Provider store={store}>
      <Router>
        <BreadCrumbs />
        <form>
          {/*<IndexDataLoader />*/}
          {/*<TableLoader />*/}
          <div style={{ 'margin': 50 }}>
            <DataProvider
              modelName={'clients'}
              models={{}}
              fields={[
                'id',
                'discount',
                'name',
                'phone_number',
                'address'
                //'updated_at',
              ]}
              labels={{
                'name': 'Имя'
              }}
              showCount={false}
              infoLabels={{}}
            />
          </div>
          <DatePicker
            style
            name={'departure_date'}
            model={'orders'}
            label={''}
            className={'main-input'}
            onChange={(event) => setDate(event)}
            value={date}
            required={true}
          />
          <InputField name={'address'} model={'clients'} label={''} class={'main-input'}
                      placeholder={'Адреса'} onChange={(event) => setText(event.target.value)}
                      value={text} validated={textOutValidation} helpBlock={textOutHelpBlock} pluginProps={{
                        required: true,
                        type: 'password'
          }} />
          <TextArea name={'address'} model={'clients'} label={''} class={'main-input'}
                    placeholder={'Адреса'} onChange={(event) => setText(event.target.value)}
                    value={text} />
          <DropDownList name={'discount'} model={'clients'} label={''} class={'main-input'}
                        options={[
                          { value: '1', label: 'Test 1' },
                          { value: '2', label: 'Test 2' },
                          { value: '3rt', label: 'Test 3' }
                        ]}
                        placeholder={'Адреса'} onChange={(event) => setDropdownValue(event)}
                        value={dropdownValue} required={true} />
          <CheckBox name={'discount'} model={'clients'} label={''} class={'main-input'}
                    options={{ '1': 'Test1', '2': 'Test2', '3': 'Test3' }}
                    placeholder={'Адреса'} onChange={(values) => setCheckBoxValues(values)}
                    values={checkBoxValues} />
          <CheckBox name={'discount'} model={'clients'} label={''} class={'main-input'}
                    options={{ '1': 'Test Alone Guy' }}
                    placeholder={'Адреса'} onChange={(values) => setAloneCheckbox(values)}
                    values={aloneCheckbox} required={true}/>
          <RadioButton name={'discount'} model={'clients'} label={''} class={'main-input'}
                       options={{ '1': 'Test R 1', '2': 'Test R 2', '3': 'Test R 3' }}
                       placeholder={'Адреса'} onChange={(value) => setRadiobuttonValue(value)}
                       value={radiobuttonValue} />
          <PhonePicker
            name={'phone_number'}
            model={'clients'}
            label={''}
            class={'main-input'}
            onChange={(event) => setPhoneNumber(event)}
            value={phoneNumber}
          />

        </form>
        <h3>Index page components test</h3>
        {PrepareIndexModal(modalCallbacks(), modal, 'restore', {title:'test'})}
        <div className={'index-page-header'}>
          <h1>Title</h1>
          <div className={'model-actions'}>
            <a className="btn btn-success">TEST BUTTON</a>
          </div>
        </div>
        <DataView
          models={dummyModel}
          modelName={"roles"}
          attributes={{
            id: 'Id',
            name: 'Name',
            is_delete: 'Is_delete',
            created_at: 'Created_at',
            updated_at: 'Updated_at',
          }}
          actions={{
            view: {title: "view", icon: <div><strong>Cust0m <i>action icon</i> as a HTML</strong><button className={"btn btn-success"}>bTn</button></div>},
            update: {title: "update"},
            delete: {title: "delete"},
            restore: {title: "restore"},
          }}
          modalActions={{
            onModalOpen: () => {setModal(true)},
          }}
          ifEmpty={"Create first element"}
          pagination={{
            currentPage: 1,
            totalPages: 3,
            callback: () => {}
          }}
        />
      </Router>
    </Provider>
  )
}

export default App
