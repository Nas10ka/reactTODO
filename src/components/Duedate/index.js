import React, { Component } from 'react';
import Styles from './styles';

export default class Duedate extends Component {
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

        console.log(finishDate);

        this.setState({
            finishDate
        });
        this.props.setDate(finishDate);
    }
    render () {
        return (
            <input
                className = { Styles.datepicker }
                onChange = { this.setDate }
                type = 'date'
            />
        );
    }
}
