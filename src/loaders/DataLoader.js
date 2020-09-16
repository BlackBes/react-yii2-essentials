import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

class DataLoader extends Component {
  render() {
    return (
      <div className='container loader-container'>
        <Loader
          type='TailSpin'
          color='#5cb85c'
          height={80}
          width={80}
          className='loader'
        />
      </div>
    )
  }
}

export default DataLoader
