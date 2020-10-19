import React, { Component } from 'react'
import axios from 'axios'
import stringify from 'qs-stringify'
import { connect } from 'react-redux'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap4-modal'
import Pagination from '../navigation/pagination'
import TableLoader from '../loaders/TableLoader'
import { createLabel } from '../libs/yii-validation'

class DataProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      models: {},
      isDataLoaded: false,
      modal: false,
      modelToDelete: '',
      page: 1,
      hasError: false
    }

    this.fetchData = this.fetchData.bind(this)
    this.deleteModel = this.deleteModel.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.paginationAction = this.paginationAction.bind(this)
  }

  componentDidMount() {
    this.fetchData(this.state.page)
  }

  fetchData = async (pageNum) => {
    const this_el = this
    await axios({
      method: 'post',
      url:
        this.props.api.address +
        '/' +
        this.props.modelName +
        '/index?page=' +
        pageNum,
      data: stringify({}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Bearer ' + this.props.api.authToken
      }
    })
      .then(function(response) {
        if (response.data !== '' && response.data.constructor === Object) {
          const event = response.data

          this_el.setState({ models: event.data })
          const name = this_el.props.modelName.split('-')
          let fullName = ''
          name.map(function(el) {
            fullName += el.charAt(0).toUpperCase() + el.slice(1) + ' '
          })

          this_el.setState({ isDataLoaded: true })
        } else {
          console.log('Error while fetching events data!')
        }
      })
      .catch(function(error) {
        this_el.setState({ hasError: true })
        console.log(error.message)
      })
  }

  deleteModel = async () => {
    const id = this.state.modelToDelete
    const this_el = this
    await axios({
      method: 'post',
      url:
        this.props.api.address +
        '/' +
        this.props.modelName +
        '/delete?id=' +
        id,
      data: stringify({}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Bearer ' + this.props.api.authToken
      }
    })
      .then(function(response) {
        if (response.data !== '' && response.data.constructor === Object) {
          // let event = response.data;
          this_el.fetchData(this_el.state.page)
          this_el.setState({ redirect: true })

          this_el.closeModal()
        } else {
          console.log('Error while fetching events data!')
        }
      })
      .catch(function(error) {
        console.log(error.message)
      })
  }

  closeModal() {
    this.setState({ modal: false })
    this.setState({ modelToDelete: '' })
  }

  openModal(id) {
    this.setState({ modelToDelete: id })
    this.setState({ modal: true })
  }

  paginationAction(id) {
    this.setState({ page: id })
    this.setState({ isDataLoaded: false })
    this.fetchData(id)
  }

  render() {
    if (this.state.isDataLoaded) {
      const models = this.state.models.data
      const this_el = this
      const head = []
      const rows = []

      if (this.props.showCount !== false) {
        head.push(<th key='hash'>#</th>)
      }

      if (models.length === 0) {
        return (
          <h3>
            <small className='text-muted'>Create your first item</small>
          </h3>
        )
      }
      Object.entries(models[0]).forEach(function(val, key) {
        if (this_el.props.hasOwnProperty('fields')) {

          if (this_el.props.fields.includes(val[0])) {
            let elKey = ''
            this_el.props.fields.find(function(el, index, array) {
              if (el === val[0]) {
                elKey = index
              }
            })

            let label = createLabel(val[0]);
            if (this_el.props.hasOwnProperty('labels')) {
              if (this_el.props.labels.hasOwnProperty(val[0])) {
                label = this_el.props.labels[val[0]];
              }
              head[elKey+1] = <th key={val[0]}>{label}</th>;
            } else {
              head[elKey+1] = <th key={val[0]}>{label}</th>;
            }

          }

        } else {
          let label = createLabel(val[0])
          head.push(<th key={val[0]}>{label}</th>)
        }
      })

      head.push(
        <th key='free' className='action-column data-provider-control' />
      )

      Object.entries(models).forEach(function(value, key) {
        const row = []

        if (this_el.props.showCount !== false) {
          row.push(<td key={'num-' + value[1].id}>{value[0]}</td>)
        }

        Object.entries(value[1]).forEach(function(val, key) {
          if (this_el.props.hasOwnProperty('fields')) {
            let elKey = '';
            this_el.props.fields.find(function(el, index, array) {
              if (el === val[0]) {
                elKey = index
              }
            });
            if (this_el.props.fields.includes(val[0])) {
              row[elKey+1] = <td key={val[0] + '-' + value[1].id}>{val[1]}</td>;
            }
          } else {
            row.push(<td key={val[0] + '-' + value[1].id}>{val[1]}</td>);
          }
        })

        row.push(
          <td key={'control-' + value[1].id} className='data-provider-control'>
            <Link
              className='model-control-icon'
              to={'/' + this_el.props.modelName + '/view/' + value[1].id}
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
            <Link
              className='model-control-icon'
              to={'/' + this_el.props.modelName + '/update/' + value[1].id}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            <span
              className='model-control-icon model-delete-icon'
              onClick={() => this_el.openModal(value[1].id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </td>
        )
        rows.push(<tr key={'el-' + value[1].id}>{row}</tr>)
      })

      return (
        <div className='table-responsive'>
          <Modal visible={this.state.modal} onClickBackdrop={this.closeModal}>
            <div className='modal-header'>
              <h5 className='modal-title'>Deleting</h5>
            </div>
            <div className='modal-body'>
              <p>Are you sure you want to delete this item?</p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={this.closeModal}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={this.deleteModel}
              >
                Delete
              </button>
            </div>
          </Modal>

          <table className='table table-striped table-bordered table-hover'>
            <thead>
            <tr>{head}</tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>

          <Pagination
            currentPage={this.state.page}
            totalPages={this.state.models.total_pages}
            callback={this.paginationAction}
          />
        </div>
      )
    } else {
      if (!this.state.hasError) {
        return <TableLoader />
      } else {
        return (
          <div
            className='alert alert-danger'
            style={{ marginTop: '20px' }}
            role='alert'
          >
            Network Error occurred!
          </div>
        )
      }
    }
  }
}

const mapStateToProps = (state) => ({
  api: state.api
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider)
