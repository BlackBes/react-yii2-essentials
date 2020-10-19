import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import stringify from 'qs-stringify/index'
import { connect } from 'react-redux'
import { validate, prepareLabel } from '../libs/yii-validation'

class DropDownList extends Component {
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
    options: PropTypes.object,
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
    /** Default value text */
    defaultValueText: PropTypes.string
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

  listItem(props) {
    let array = []

    Object.entries(this.props.options).map((data) => {
      array.push(<option key={data[0]} value={data[0]}>{data[1]}</option>)
    })

    return array
  }

  editApi = async (event) => {
    const this_el = this
    //this.setState({value: event.target.value});
    this.props.onChange(event)
    //console.log(event.target.value)

    if (this_el.props.model !== undefined && this_el.props.model !== '') {
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
        })
    }
  }


  render() {
    let validated = (this.props.validated !== undefined) ? this.props.validated : this.state.validation;
    return (
      <div className={'form-group field-' + this.props.model + '-' + this.props.name + ' ' + this.props.class}>
        <label className={'control-label'}
               htmlFor={this.props.model + '-' + this.props.name}>
          {this.labelName}
        </label>
        <select id={this.props.model + '-' + this.props.name}
                value={this.state.value}
                className={'custom-select form-control ' + (validated !== '' ? (validated === true) ? 'is-valid' : 'is-invalid' : '')}
                name={this.props.name}
                onChange={this.editApi}
                required={this.props.required}>
          <option value="" defaultValue={true}>{(this.props.defaultValueText !== undefined) ? this.props.defaultValueText : ''}</option>
          {(this.listItem())}
        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DropDownList)
