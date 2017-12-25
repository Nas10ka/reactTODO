import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

export default class User extends Component {
    static propTypes = {
        choseUserName:         PropTypes.func,
        modalIs:               PropTypes.bool,
        tasksFilterByUsername: PropTypes.func,
        user:                  PropTypes.string
    };

    constructor () {
        super();
        this.choseUser = ::this.choseUser;
        this.getNameFirstLetter = ::this.getNameFirstLetter;
        this.setUserToTask = ::this.setUserToTask;
    }
    state = {
        firstLetter: 'A',
        user:        ''
    };
    componentWillMount () {
        this.getNameFirstLetter();
    }
    setUserToTask () {
        const { user } = this.props;

        this.props.choseUserName(user);
    }
    getNameFirstLetter () {
        const { user } = this.props;
        const firstLetter = user[0];

        this.setState({
            firstLetter
        });
    }
    choseUser () {
        const { user } = this.props;

        this.props.tasksFilterByUsername(user);
    }
    render () {
        const { user, modalIs } = this.props;
        const { firstLetter } = this.state;

        if (modalIs) {
            return (
                <li className = { Styles.modalUser } onClick = { this.setUserToTask }>
                    {user}
                </li>
            );
        }

        return (
            <div className = { Styles.user } onClick = { this.choseUser }>
                {firstLetter}
            </div>
        );
    }
}
