import React, { Component } from 'react'
import {
  faCircle,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Pagination extends Component {
  render() {
    const cells = []

    if (this.props.totalPages <= 10) {
      for (let i = 1; i <= this.props.totalPages; i++) {
        cells.push(i)
      }
    } else {
      cells.push(1)
      cells.push(2)
      for (
        let i = this.props.currentPage - 2;
        i <= this.props.currentPage + 2;
        i++
      ) {
        if (i > 0 && i <= this.props.totalPages) {
          cells.push(i)
        }
      }

      cells.push(this.props.totalPages - 1)
      cells.push(this.props.totalPages)
    }
    const pageEls = []

    let isDotsShowed = false
    for (let i = 1; i <= this.props.totalPages; i++) {
      let active = ''

      if (i === this.props.currentPage) {
        active = 'active'
      }

      if (cells.includes(i)) {
        isDotsShowed = false

        pageEls.push(
          <li className='page-item' key={i}>
            <button
              className={'page-link ' + active}
              onClick={() => this.props.callback(i)}
            >
              {i}
            </button>
          </li>
        )
      } else {
        if (!isDotsShowed) {
          isDotsShowed = true
          pageEls.push(
            <li className='page-circles' key={i}>
              <FontAwesomeIcon icon={faCircle} />
              <FontAwesomeIcon icon={faCircle} />
              <FontAwesomeIcon icon={faCircle} />
            </li>
          )
        }
      }
    }

    return (
      <nav aria-label='Page navigation example'>
        <ul className='pagination justify-content-center'>
          <li className='page-item' key='prev'>
            <button
              disabled={this.props.currentPage - 1 < 1 ? 'disabled' : ''}
              className='page-link'
              onClick={() => this.props.callback(this.props.currentPage - 1)}
              aria-label='Previous'
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>
          </li>
          {pageEls}
          <li className='page-item' key='next'>
            <button
              disabled={
                this.props.currentPage + 1 > this.props.totalPages
                  ? 'disabled'
                  : ''
              }
              className='page-link'
              onClick={() => this.props.callback(this.props.currentPage + 1)}
              aria-label='Next'
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination;
