import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import stringify from "qs-stringify/index";
import {connect} from "react-redux";

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
        /** Placeholder for input. */
        placeholder: PropTypes.string,
        /** object Key and value*/
        options: PropTypes.object,
        /** Function, that handle change event. */
        onChange: PropTypes.func,
    }


    constructor(props) {
        super(props);

        this.state = {
            helpBlock: '',
            validation: ''
        };
        if (this.props.label === false || this.props.label === ''){
            let temp = this.props.name;
            temp = temp.replace(/([-_][a-z])/ig, ($1) => {
                return $1.toUpperCase()
                    .replace('-', ' ')
                    .replace('_', ' ');
            });
            temp = temp.charAt(0).toUpperCase() + temp.slice(1);
            this.labelName = temp;
        } else {
            this.labelName = false;
        }
        this.editApi = this.editApi.bind(this);

    }

    radioItem() {
        let array = [];
        for (var key in this.props.options) {
            array.push(
                <div key={'divRadio-'+key} className={"form-check form-check-inline"}>
                    <input
                        id={this.props.model + "-" + this.props.name + " radio-"+key}
                        className={'form-check-input '+ (this.state.validation !== ''? (this.state.validation === true) ? 'is-valid' : 'is-invalid' : '' )}
                        type={'radio'}
                        name={this.props.name}
                        key={'radio-'+key}
                        value={this.props.value}
                        onChange={this.editApi}
                    />
                    <label key={'labelForRadio-'+key} className={"form-check-label"} htmlFor={this.props.model + "-" + this.props.name + " radio-"+key}>{key}</label>
                </div>

            )
        }
        return array;
    }

    editApi = async (event) => {
        const this_el = this;
        //this.setState({value: event.target.value});
        this.props.onChange(event);
        //console.log(event.target.value);

        await axios({
            method: 'post',
            url: this_el.props.api.address + '/validate-model-input',
            data: stringify({
                model: this_el.props.model,
                name: this_el.props.name,
                value: event.target.value
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer '+this_el.props.api.authToken
            }

        }).then(function (response) {
            if (response.data !== '' && response.data.constructor === Object) {
                let event = response.data;

                if (!('error' in event)) {
                    this_el.setState({helpBlock: ''});
                    this_el.setState({validation: true});
                } else {
                    this_el.setState({helpBlock: event.error});
                    this_el.setState({validation: false});
                }
            } else {
                console.log('Error while fetching events data!');
            }
        }).catch(function (error) {
            console.log(error.message);
        });
    }



    render() {
        return (
            <div className={'form-group field-' + this.props.model + "-" + this.props.name + ' ' + this.props.class}>
                <div>
                    <label className={'control-label'}
                           htmlFor={this.props.model + "-" + this.props.name}>
                        {(this.labelName ? this.labelName : this.props.label)}
                    </label>
                </div>
                {(this.radioItem())}
                <div className={(this.state.validation !== ''? (this.state.validation === true) ? 'valid-feedback' : 'invalid-feedback' : '')}>{this.state.helpBlock}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    api: state.api
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RadioButton);
