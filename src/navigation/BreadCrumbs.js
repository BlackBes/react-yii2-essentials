import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setBreadcrumbs } from '../actions'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class BreadCrumbs extends Component {
  static propTypes = {
    /** breadcrumbs. */
    breadcrumbs: PropTypes.object,
    name: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  generateElementList() {
    const arr = this.props.breadcrumbs.breadcrumbs
    let key = 0
    const bread = []
    arr.forEach((element) => {
      if (element === arr[arr.length - 1]) {
        bread.push(
          <li key={key} className='breadcrumb-item active'>
            {element.name}{' '}
          </li>
        )
      } else {
        bread.push(
          <li key={key} className='breadcrumb-item'>
            <Link to={element.link}>{element.name}</Link>
          </li>
        )
      }
      key++
    })
    return bread
  }

  render() {
    return (
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>{this.generateElementList()}</ol>
      </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  api: state.api,
  breadcrumbs: state.breadcrumbs
})

const mapDispatchToProps = (dispatch) => ({
  setBreadcrumbs: (breadcrumb) => dispatch(setBreadcrumbs(breadcrumb))
})

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbs)
