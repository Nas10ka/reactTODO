import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

export default class Todo extends Component {
    static propTypes = {
        canDelete:    PropTypes.string.isRequired,
        checkTask:    PropTypes.func.isRequired,
        classes:      PropTypes.string.isRequired,
        deleteTask:   PropTypes.func.isRequired,
        id:           PropTypes.string.isRequired,
        taskName:     PropTypes.string.isRequired,
        description:  PropTypes.string,
        duedate:      PropTypes.string,
        finishDate:   PropTypes.string,
        overdue:      PropTypes.string,
        taskProject:  PropTypes.any,
        taskUserName: PropTypes.string
    };

    constructor () {
        super();
        this.checkTask = ::this._checkTask;
        this.deleteTask = ::this._deleteTask;
    }

    _checkTask () {
        const { id } = this.props;

        this.props.checkTask(id);
    }

    _deleteTask () {
        const { id } = this.props;

        this.props.deleteTask(id);
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
            taskProject,
            taskUserName
        } = this.props;

        return (
            <li className = { `${classes}` }>
                {`${canDelete}` !== 'true' ?
                    finishDate ? (
                        <b className = { Styles.duedate }>{duedate}</b>
                    ) : null
                    : null}
                <span id = { id } onClick = { this.checkTask }>
                    &#10003;
                </span>
                <h3>{taskName}</h3>
                <p>{description}</p>
                {taskUserName ? (
                    <p>
                        <br />User: <b>{taskUserName}</b>
                    </p>
                ) : null}
                {taskProject ? (
                    <p>
                        <br />Project: <b>{taskProject}</b>
                    </p>
                ) : null}
                {`${canDelete}` === 'true' ? (
                    <i
                        className = { Styles.delete }
                        id = { id }
                        title = 'Delete task'
                        onClick = { this.deleteTask }>
                        &times;
                    </i>
                ) : finishDate ?
                    `${overdue}` === 'true' ? (
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
