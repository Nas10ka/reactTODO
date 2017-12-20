import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';
import Modal from '../Modal';

export default class Createbutton extends Component {
    static propsTypes = {
        saveTask:       PropTypes.func,
        updateTodoList: PropTypes.func
    };
    constructor () {
        super();
        this.handleClick = ::this.handleClick;
        this.closeModal = ::this.closeModal;
    }
    state = {
        modalActive: false
    };

    handleClick (event) {
        event.preventDefault();

        this.setState({
            modalActive: true
        });
    }

    closeModal (param) {
        this.setState({
            modalActive: param
        });
    }
    render () {
        const { modalActive } = this.state;
        const { saveTask, updateTodoList } = this.props;

        return (
            <div className = { Styles.create }>
                <div onClick = { this.handleClick } className = { Styles.createbutton }>
                    ADD NEW TASK
                </div>
                <Modal
                    closeModal = { this.closeModal }
                    modalActive = { modalActive }
                    saveTask = { saveTask }
                    updateTodoList = { updateTodoList }
                />
            </div>
        );
    }
}
