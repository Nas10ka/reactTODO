import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

export default class Createuser extends Component {
    static propTypes = {
        addNewUser:     PropTypes.func.isRequired,
        inputName:      PropTypes.bool.isRequired,
        saveUser:       PropTypes.func.isRequired,
        updateUserList: PropTypes.func.isRequired
    };

    constructor () {
        super();
        this.addUser = ::this.addUser;
        this.handlerEnterName = ::this.handlerEnterName;
        this.handleInputNameChange = ::this.handleInputNameChange;
    }
    state = {
        inputName: '',
        user:      ''
    };

    handlerEnterName (event) {
        const spaceKey = event.keyCode;
        const { user } = this.state;

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
                <span
                    className = { Styles.addUser }
                    title = 'Add new people - press space bar'
                    onClick = { this.addUser }>
                    +
                </span>
                {inputName ? (
                    <input
                        className = { Styles.addNewUser }
                        placeholder = 'Add new User'
                        type = 'text'
                        value = { user }
                        onChange = { this.handleInputNameChange }
                        onKeyDown = { this.handlerEnterName }
                    />
                ) : null}
            </div>
        );
    }
}
