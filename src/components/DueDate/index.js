import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

export default class Duedate extends Component {
    static propTypes = {
        setDate: PropTypes.func
    };

    constructor () {
        super();
        this.setDate = ::this.setDate;
    }
    state = {
        finishDate: ''
    };
    setDate (event) {
        event.preventDefault();
        const { value: finishDate } = event.target;

        this.setState({
            finishDate
        });
        this.props.setDate(finishDate);
    }
    render () {
        return (
            <input
                className = { Styles.datepicker }
                type = 'date'
                onChange = { this.setDate }
            />
        );
    }
}
