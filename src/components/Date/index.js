import React, { Component } from 'react';
import moment from 'moment';
import Styles from './styles';

export default class Date extends Component {
    state = {
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
    };

    componentDidMount () {
        this.timerID = setInterval(() => {
            this.setState({
                date: moment().format('MMMM Do YYYY, h:mm:ss a')
            });
        }, 1000);
    }

    render () {
        const { date } = this.state;

        return <b className = { Styles.datetime }>{date}</b>;
    }
}
