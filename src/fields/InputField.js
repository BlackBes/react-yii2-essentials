import React, { Component } from 'react'
import axios from 'axios'
import stringify from 'qs-stringify'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../App.css'
import {validate, prepareLabel} from '../libs/yii-validation'

class InputField extends Component {
  static propTypes = {
    /** Name of field in model. */
    name: PropTypes.string.isRequired,
    /** Name of a model. */
    model: PropTypes.string,
    /** Value of field. */
    value: PropTypes.any,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** Placeholder for input. */
    placeholder: PropTypes.string,
    /** Function, that handle change event. */
    onChange: PropTypes.func,
    /** Required. */
    required: PropTypes.bool,
    /** Help block text */
    helpBlock: PropTypes.string,
    /** Help block text */
    validated: PropTypes.any,
    /** Other props for plugin */
    pluginProps: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      helpBlock: '',
      validation: ''
    }
    this.labelName = prepareLabel(this.props.label, this.props.name);
    this.editApi = this.editApi.bind(this)
  }

  editApi = (event) => {
    const this_el = this

    this.props.onChange(event)

    if(this_el.props.model !== undefined && this_el.props.model !== '') {
      validate(this_el.props.model,
        this_el.props.name,
        event.target.value,
        this_el.props.api.address,
        this_el.props.api.authToken,
        function() {
          this_el.setState({ helpBlock: '' })
          this_el.setState({ validation: true })
        },
        function(err) {
          this_el.setState({ helpBlock: err })
          this_el.setState({ validation: false })
        });
    }
  }

  render() {
    let validated = (this.props.validated !== undefined) ? this.props.validated : this.state.validation;
    let required = (this.props.required === true) ? 'required' : '';
    return (
      <div
        className={
          'form-group field-' +
          this.props.model +
          '-' +
          this.props.name +
          ' ' +
          this.props.class+
          ' '+
          required
        }
      >
        <label
          className='control-label'
          htmlFor={this.props.model + '-' + this.props.name}
        >
          {this.labelName}
        </label>
        <input
          id={this.props.model + '-' + this.props.name}
          className={
            'form-control ' +
            (validated !== ''
              ? validated === true
                ? 'is-valid'
                : 'is-invalid'
              : '')
          }
          {...this.props.pluginProps}
          name={this.props.name}
          placeholder={this.props.placeholder}
          required={this.props.required }
          value={this.props.value || ''}
          onChange={this.editApi}
        />
        <div
          className={
            validated !== ''
              ? validated === true
              ? 'valid-feedback'
              : 'invalid-feedback'
              : ''
          }
        >
          {(this.props.validated !== undefined) ? this.props.helpBlock : this.state.helpBlock}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  api: state.api
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InputField)
