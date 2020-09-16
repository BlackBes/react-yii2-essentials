import React from 'react'
import { TableLoader, IndexDataLoader, InputField } from 'react-yii2-essentials'
import store from './store'
import { Provider } from 'react-redux'
import "react-yii2-essentials/src/styles.module.css"

const App = () => {
  function test() {

  }
  return (
    <Provider store={store}>
      <div>
        <IndexDataLoader />
        <TableLoader />
        <InputField name={'address'} model={'user'} label={''} class={'main-input'}
                    placeholder={'Адреса'} onChange={test}
                    value={12}/>
      </div>
    </Provider>
  )
}

export default App
