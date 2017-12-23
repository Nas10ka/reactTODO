import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

export default class Todo extends Component {
    static propsTypes = {
        description: PropTypes.string,
        taskName:    PropTypes.string
    };
    constructor () {
        super();
        this.checkTask = ::this.checkTask;
        this.deleteTask = ::this.deleteTask;
    }
    checkTask () {
        this.props.checkTask(this.props.id);
    }

    deleteTask () {
        this.props.deleteTask(this.props.id);
    }

    render () {
        const {
            description,
            id,
            taskName,
            classes,
            canDelete,
            finishDate,
            overdue,
            duedate,
            taskUserName
        } = this.props;

        return (
            <li className = { `${classes}` }>
                {`${canDelete}` !== 'true' ?
                    finishDate ? (
                        <b className = { Styles.duedate }>{duedate}</b>
                    ) : null
                    : null}
                <span onClick = { this.checkTask } id = { id }>
                    &#10003;
                </span>
                <h3>{taskName}</h3>
                <p>{description}</p>
                {
                    taskUserName ? (<p><br/>User: <b>{taskUserName}</b></p>) :  (null)
                }
                {

                    `${canDelete}` == 'true' ? (
                    <i
                        onClick = { this.deleteTask }
                        id = { id }
                        className = { Styles.delete }
                        title = 'Delete task'>
                        &times;
                    </i>
                ) : finishDate ?
                    `${overdue}` == 'true' ? (
                        <b className = { Styles.overdue }>
                            <br />Deadline passed: {finishDate}
                        </b>
                    ) : (
                        <b className = { Styles.deadline }>
                            <br />Deadline: {finishDate}
                        </b>
                    )
                    : null}
            </li>
        );
    }
}
