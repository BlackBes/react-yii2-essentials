import axios from 'axios'
import stringify from 'qs-stringify'

/**
 * Async function used to fetch index data from server.
 * @param api
 * @param api.address Api address of your server
 * @param api.authToken User auth token
 * @param {string} model Model name
 * @param page Page number to be used as offset for query
 * @param onDataFetched Callback that triggers after we receive response from the server.
 * @param onDataFetched.onSuccess - Callback that triggers if the response is successful.
 * @param onDataFetched.onError - Callback that triggers if the response was unsuccessful.
 * @returns {Promise<void>}
 * @constructor
 */
const FetchIndexData = async (api, model, page, onDataFetched) => {
  await axios({
    method: 'post',
    url: `${api.address}/${model}/index?page=${page}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': 'Bearer ' + api.authToken
    }
  }).then(function(response) {
    if (response.data !== '' && response.data.constructor === Object) {
      onDataFetched(response).onSuccess()
    } else {
      console.log('Error while fetching events data!')
      onDataFetched(response).onError()
    }
  }).catch(function(error) {
    console.log(error)
    onDataFetched(error).onError()
  })
}

/**
 * Async function used to fetch and build necessary data for modal callbacks.
 * @param api
 * @param api.address Api address of your server
 * @param api.authToken User auth token
 * @param {string} model Model name
 * @param {string} action Controller action. Ex: actionDelete() will be 'delete'; actionGetNews() will be 'get-news'
 * @param id Model id
 * @param onManipulateIndexData Callback that triggers after we receive response from the server.
 * @param onManipulateIndexData.onSuccess - Callback that triggers if the response is successful.
 * @param onManipulateIndexData.onError - Callback that triggers if the response was unsuccessful.
 * @returns {Promise<void>}
 * @constructor
 */
const ManipulateIndexData = async (api, model, action, id, onManipulateIndexData) => {
  await axios({
    method: 'post',
    url: `${api.address}/${model}/${action}?id=${id}`,
    data: stringify({}),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Bearer ' + api.authToken
    }
  }).then(function(response) {
    if (response.data !== '' && response.data.constructor === Object) {
      onManipulateIndexData(response).onSuccess()
    } else {
      console.log('Error while fetching events data!')
      onManipulateIndexData(response).onError()
    }
  })
    .catch(function(error) {
      console.log(error.message)
      onManipulateIndexData(error).onError()
    })
}

export { FetchIndexData, ManipulateIndexData }
