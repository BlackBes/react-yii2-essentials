import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { validate, prepareLabel } from '../libs/yii-validation';

import {IMaskInput} from 'react-imask';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import 'moment/locale/ru';
import moment from "moment";
//import IMask from 'imask/esm/imask';
const momentFormat = 'DD.MM.YYYY HH:mm';
class DatePicker extends Component {
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

  editApi = async (date) => {
    const this_el = this
    //this.setState({value: event.target.value});
    this.props.onChange(date);
    date = moment(date, momentFormat).format(momentFormat);

    if (this_el.props.model !== undefined && this_el.props.model !== '') {
      validate(this_el.props.model,
        this_el.props.name,
        date,
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

  render() {
    let validated = (this.props.validated !== undefined) ? this.props.validated : this.state.validation;
    let required = (this.props.pluginProps !== undefined) ? (this.props.pluginProps.hasOwnProperty("required") ? 'required' : '') : '';
    return (
      <div className={'form-group field-' + this.props.model + '-' + this.props.name + ' ' + this.props.class }>
        <label className={'control-label '+required}
               htmlFor={this.props.model + '-' + this.props.name}>
          {this.labelName}
        </label>
        <Datetime
          {...this.props.pluginProps}
          dateFormat={'DD.MM.YYYY'}
          timeFormat={"HH:mm"}
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={(value_) => this.editApi(value_)}
          locale="Ru"
          {...this.props.pluginProps}
          inputProps={{
            validated: validated,
            model: this.props.model,
            name: this.props.name,
            placeholder: this.props.placeholder
          }}
          renderInput={ExampleCustomInput}
        />
        <div
          className={(validated !== '' ? (validated === true) ? 'valid-feedback' : 'invalid-feedback' : '')}>{(this.props.validated !== undefined) ? this.props.helpBlock : this.state.helpBlock}</div>
      </div>
    )
  }
}

const ExampleCustomInput = (props, openCalendar, closeCalendar) => {
  return <IMaskInput
    mask={Date}
    pattern={momentFormat}
    lazy={false}
    min={new Date(1970, 0, 1)}
    max={new Date(2030, 0, 1)}
    format={function (date) {
      return moment(date).format(momentFormat);
    }}
    parse={function (str) {
      return moment(str, momentFormat);
    }}
    blocks={{
      YYYY: {
        mask: IMask.MaskedRange,
        from: 1970,
        to: 2030
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12
      },
      DD: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31
      },
      HH: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 23
      },
      mm: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59
      }
    }}
    id={props.model + '-' + props.name}
    className={
      'form-control ' + props.className + ' ' +
      (props.validated.toString() !== ''
        ? props.validated.toString() === 'true'
          ? 'is-valid'
          : 'is-invalid'
        : '')
    }
    name={props.name}
    placeholder={props.placeholder}
    value={props.value || ''}
    onClick={(event) => openCalendar(event)}
    onInput={(event) => props.onChange(event)}
  />
};

const mapStateToProps = state => ({
  api: state.api
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker)
