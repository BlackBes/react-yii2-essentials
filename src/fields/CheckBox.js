import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import stringify from 'qs-stringify'
import { validate, prepareLabel } from '../libs/yii-validation'

class CheckBox extends Component {
  static propTypes = {
    /** Name of field in model. */
    name: PropTypes.string.isRequired,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** object Key and value */
    options: PropTypes.object,
    /** Values of fields. */
    values: PropTypes.objectOf(PropTypes.bool),
    /** Key of field. */
    key: PropTypes.any
  }

  constructor(props) {
    super(props)
    let values = {}
    Object.entries(this.props.options).map((data) => {
      if (!values.hasOwnProperty(data[0])) {
        if (this.props.values.hasOwnProperty(data[0])) {
          values[data[0]] = this.props.values[data[0]]
        } else {
          values[data[0]] = false
        }
      }
    });
    this.state = {
      helpBlock: '',
      validation: '',
      values: values
    }
    this.labelName = prepareLabel(this.props.label, this.props.name)
    this.editApi = this.editApi.bind(this)
  }

  editApi = async (event, checkboxId) => {
    const this_el = this
    // this.setState({value: event.target.value});
    let values = {}
    Object.entries(this.state.values).map((data) => {
      if (data[0] === checkboxId) {
        values[data[0]] = event.target.checked;
      } else {
        values[data[0]] = data[1];
      }
    })
    console.log(values);
    this.props.onChange(values)
    this.setState({values: values});
  }

  boxItem() {
    const array = []
    Object.entries(this.props.options).map((data) => {
      array.push(
        <div
          key={'divCheckbox-' + data[0]}
          className='form-check form-check-inline'
        >
          <input
            id={this.props.model + '-' + this.props.name + ' checkbox-' + data[0]}
            className={
              'form-check-input ' +
              (this.state.validation !== ''
                ? this.state.validation === true
                  ? 'is-valid'
                  : 'is-invalid'
                : '')
            }
            type='checkbox'
            name={this.props.name}
            key={'checkbox-' + data[0]}
            checked={this.state.values[data[0]]}
            onChange={(event) => this.editApi(event, data[0])}
          />
          <label
            key={'labelForCheckbox-' + data[0]}
            className='form-check-label'
            htmlFor={
              this.props.model + '-' + this.props.name + ' checkbox-' + data[0]
            }
          >
            {data[1]}
          </label>
        </div>
      )
    })
    return array;
  }

  render() {
    return (
      <div
        className={
          'form-group field-' +
          this.props.model +
          '-' +
          this.props.name +
          ' ' +
          this.props.class
        }
      >
        <div>
          <label
            className='control-label'
            htmlFor={this.props.model + '-' + this.props.name}
          >
            {this.labelName}
          </label>
        </div>
        {this.boxItem()}
        <div
          className={
            this.state.validation !== ''
              ? this.state.validation === true
              ? 'valid-feedback'
              : 'invalid-feedback'
              : ''
          }
        >
          {this.state.helpBlock}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  api: state.api
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CheckBox)
