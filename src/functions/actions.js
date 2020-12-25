import axios from 'axios'
import stringify from 'qs-stringify'

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
