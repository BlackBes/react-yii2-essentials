import axios from 'axios'
import stringify from 'qs-stringify'
import { connect } from 'react-redux'

/**
 * Validating data by asking server for model validation.
 * @param {string} model - Name of model in Yii2 style
 * @param {string} name - Name of filed in model
 * @param {*} value - Value to validate
 * @param {string} address - Address of api endpoint
 * @param {string} authToken - Authorization token for server
 * @param {function} onSuccess - Callback in case of success
 * @param {function} onError - Callback in case of error
 * @returns {Promise<void>}
 */
async function validate(model, name, value, address, authToken, onSuccess, onError) {
  await axios({
    method: 'post',
    url: address + '/validate-model-input',
    data: stringify({
      model: model,
      name: name,
      value: value
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Bearer ' + authToken
    }
  })
    .then(function (response) {
      if (response.data !== '' && response.data.constructor === Object) {
        const event = response.data

        if ('error' in event) {
          onError(event.error)
        } else {
          onSuccess()
        }
      } else {
        onError('Error while fetching events data!')
        console.log('Error while fetching events data!')
      }
    })
    .catch(function (error) {
      console.log(error.message)
    })
}

/**
 * Prettify label or make it from field name.
 * @param label
 * @param name
 * @returns {string|boolean}
 */
function prepareLabel(label, name) {
  if (label === false || label === '' || label === undefined) {
    let temp = name
    temp = temp.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', ' ').replace('_', ' ')
    })
    temp = temp.charAt(0).toUpperCase() + temp.slice(1)
    return temp
  } else {
    return label
  }
}

export {validate, prepareLabel}
