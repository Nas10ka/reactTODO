import React, { Component } from 'react';
import { v4 } from 'uuid';
import Styles from './styles';
import User from '../User';

export default class Modalusers extends Component {
    constructor () {
        super();
        this.choseUserName = ::this.choseUserName;
        this.getUserList = ::this.getUserList;
    }
    state = {
        users:          [],
        userListActive: false,
        taskUser:       ''
    };
    componentWillMount () {
        const { userListActive } = this.props;

        this.setState({
            userListActive
        });

        this.getUserList();
    }
    getUserList () {
        const users = JSON.parse(localStorage.getItem('users'));

        if (!users) {
            this.setState({
                users: false
            });
        } else {
            this.setState({
                users
            });
        }
    }
    choseUserName (taskUser) {
        this.props.setUserName(taskUser);
        this.setState({
            userListActive: false,
            taskUser
        });
    }
    render () {
        const { users, userListActive, taskUser } = this.state;

        if (users) {
            var user = users.map((props) => (
                <User
                    choseUserName = { this.choseUserName }
                    key = { v4() }
                    user = { props }
                    modalIs
                />
            ));
        }

        if (userListActive) {
            return (
                <div>
                    {users ? (
                        <ul className = { Styles.modalusers }>{[user]}</ul>
                    ) : (
                        <ul className = { Styles.modalusers }>No users :(</ul>
                    )}
                </div>
            );
        } else if (taskUser) {
            return (
                <h3>
                    <span>User Name: </span>
                    {taskUser}
                </h3>
            );
        }

        return null;

    }
}
