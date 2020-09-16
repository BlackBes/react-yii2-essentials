import React, { Component } from 'react'
import IndexDataLoader from '../loaders/IndexDataLoader'
class DataTable extends Component {
  render() {
    if (this.props.model.length !== 0) {
      const rows = []
      const this_el = this
      Object.entries(this.props.model).forEach(function (value, key) {
        if (this_el.props.hasOwnProperty('fields')) {
          if (this_el.props.fields.includes(value[0])) {
            rows.push(
              <tr key={value[0]}>
                <th>{value[0]}</th>
                <td>{value[1]}</td>
              </tr>
            )
          }
        } else {
          rows.push(
            <tr key={value[0]}>
              <th>{value[0]}</th>
              <td>{value[1]}</td>
            </tr>
          )
        }
      })

      return (
        <table className='table table-striped table-bordered'>
          <tbody>{rows}</tbody>
        </table>
      )
    } else {
      return <IndexDataLoader />
    }
  }
}

export default DataTable
