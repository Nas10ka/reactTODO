import React, { Component } from 'react';
import Styles from './styles';

export default class Createuser extends Component {
    constructor () {
        super();
        this.addUser = ::this.addUser;
        this.handlerEnterName = ::this.handlerEnterName;
        this.handleInputNameChange = ::this.handleInputNameChange;
    }
    state = {
        inputName: this.props,
        user:      ''
    };

    handlerEnterName (event) {
        const spaceKey = event.keyCode;
        const user = this.state.user;

        if (spaceKey === 32) {
            event.preventDefault();
            if (user) {
                this.props.saveUser({
                    user
                });
            }
            this.props.addNewUser(false);
            this.setState({
                user
            });
        }
        this.props.updateUserList();
    }

    handleInputNameChange (event) {
        const { value: user } = event.target;

        this.setState({
            user
        });
    }
    addUser () {
        this.props.addNewUser(true);
    }

    render () {
        const { inputName } = this.props;
        const { user } = this.state;

        return (
            <div>
                <div onClick = { this.addUser } className = { Styles.addUser } title="Add new people - press space bar">
                   +
                </div>
                {inputName ? (
                    <input
                        className={ Styles.addNewUser }
                        onKeyDown = { this.handlerEnterName }
                        onChange = { this.handleInputNameChange }
                        placeholder = 'Add new User'
                        type = 'text'
                        value = { user }
                    />
                ) : null}
            </div>
        );
    }
}
