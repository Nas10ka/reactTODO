import React, { Component } from 'react';
import Styles from './styles';

export default class User extends Component {
    constructor () {
        super();
        this.choseUser = ::this.choseUser;
        this.getNameFirstLetter = ::this.getNameFirstLetter;
        this.setUserToTask = ::this.setUserToTask;
    }
    state = {
        user:        this.props,
        firstLetter: 'A'
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
        // console.log(user);
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
            <li className = { Styles.user } onClick = { this.choseUser }>
                {firstLetter}
            </li>
        );
    }
}
