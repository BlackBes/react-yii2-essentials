import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import stringify from 'qs-stringify/index'
import { connect } from 'react-redux'
import { validate, prepareLabel } from '../libs/yii-validation'

class RadioButton extends Component {
  static propTypes = {
    /** Name of field in model. */
    name: PropTypes.string,
    /** Name of a model. */
    model: PropTypes.string,
    /** Label for input. If it empty or bool:false, using a field name. */
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    /** Add more classes to field container. */
    class: PropTypes.string,
    /** object Key and value*/
    options: PropTypes.object,
    /** Values of fields. */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /** Function, that handle change event. */
    onChange: PropTypes.func
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

  radioItem() {
    let array = []
    Object.entries(this.props.options).map((data) => {
      let value = false;
      if(data[0] === this.props.value) {
        value = true;
      }

      array.push(
        <div key={'divRadio-' + data[0]} className={'form-check form-check-inline'}>
          <input
            id={this.props.model + '-' + this.props.name + ' radio-' + data[0]}
            className={'form-check-input ' + (this.state.validation !== '' ? (this.state.validation === true) ? 'is-valid' : 'is-invalid' : '')}
            type={'radio'}
            name={this.props.name}
            key={'radio-' + data[0]}
            checked={value}
            onChange={(event) => this.editApi(event, data[0])}
          />
          <label key={'labelForRadio-' + data[0]} className={'form-check-label'}
                 htmlFor={this.props.model + '-' + this.props.name + ' radio-' + data[0]}>{data[1]}</label>
        </div>
      )
    })
    return array
  }

  editApi = async (event, radioItemId) => {
    const this_el = this
    //this.setState({value: event.target.value});
    this.props.onChange(radioItemId)
    //console.log(event.target.value);
  }

  render() {
    return (
      <div className={'form-group field-' + this.props.model + '-' + this.props.name + ' ' + this.props.class}>
        <div>
          <label className={'control-label'}
                 htmlFor={this.props.model + '-' + this.props.name}>
            {(this.labelName)}
          </label>
        </div>
        {(this.radioItem())}
        <div
          className={(this.state.validation !== '' ? (this.state.validation === true) ? 'valid-feedback' : 'invalid-feedback' : '')}>{this.state.helpBlock}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  api: state.api
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton)
