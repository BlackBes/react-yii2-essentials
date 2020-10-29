import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import stringify from 'qs-stringify/index'
import { connect } from 'react-redux'
import { validate, prepareLabel } from '../libs/yii-validation'

import PhoneInput from 'react-phone-number-input'

const CustomInput = React.forwardRef((props, ref) => {
  return <input
    {...props}
    ref={ref}
    id={props.model + '-' + props.name}
    className={
      'form-control ' + props.className + ' ' +
      (props.validated.toString() !== ''
        ? props.validated.toString() === 'true'
          ? 'is-valid'
          : 'is-invalid'
        : '')
    }
    type={props.type}
    name={props.name}
    placeholder={props.placeholder}
    autoComplete={props.autoComplete}
    value={props.value || ''}
    onChange={(event) => props.onChange(event)}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    onCut={props.onCut}
    onKeyDown={props.onKeyDown}
    onPaste={props.onPaste}
  />
});

class PhonePicker extends Component {
  static propTypes = {
    /** Name of field in model. */
    name: PropTypes.string.isRequired,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** Options array */
    options: PropTypes.arrayOf(PropTypes.object),
    /** Selected value */
    value: PropTypes.any,
    /** Function, that handle change event. */
    onChange: PropTypes.func,
    /** Required. */
    required: PropTypes.bool,
    /** Help block text */
    helpBlock: PropTypes.string,
    /** Validation value. Can be empty string or bool */
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
    this.labelName = prepareLabel(this.props.label, this.props.name)
    this.editApi = this.editApi.bind(this)
  }

  editApi = async (event) => {
    const this_el = this
    //this.setState({value: event.target.value});
    this.props.onChange(event)
    //console.log(event)
    if(event !== undefined) {
      if (this_el.props.model !== undefined && this_el.props.model !== '') {
        validate(this_el.props.model,
          this_el.props.name,
          event.toString(),
          this_el.props.api.address,
          this_el.props.api.authToken,
          function() {
            this_el.setState({ helpBlock: '' })
            this_el.setState({ validation: true })
          },
          function(err) {
            this_el.setState({ helpBlock: err })
            this_el.setState({ validation: false })
          })
      }
    }
  }

  render() {
    let validated = (this.props.validated !== undefined) ? this.props.validated : this.state.validation
    let required = (this.props.pluginProps !== undefined) ? (this.props.pluginProps.hasOwnProperty("required") ? 'required' : '') : '';

    return (
      <div className={'form-group field-' + this.props.model + '-' + this.props.name + ' ' + this.props.class}>
        <label className={'control-label '+required}
               htmlFor={this.props.model + '-' + this.props.name}>
          {this.labelName}
        </label>
        <PhoneInput
          {...this.props.pluginProps}
          international
          defaultCountry="UA"
          className={this.props.className+' '+(validated.toString() !== ''
            ? validated.toString() === 'true'
              ? 'is-valid'
              : 'is-invalid'
            : '')}
          name={this.props.name}
          model={this.props.model}
          validated={validated.toString()}
          placeholder={this.props.placeholder}
          required={this.props.required}
          value={this.props.value}
          onChange={this.editApi}
          inputComponent={CustomInput}
        />
        <div
          className={(validated !== '' ? (validated === true) ? 'valid-feedback' : 'invalid-feedback' : '')}>{(this.props.validated !== undefined) ? this.props.helpBlock : this.state.helpBlock}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  api: state.api
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PhonePicker)
