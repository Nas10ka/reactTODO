import React, { Component } from 'react';
import { v4 } from 'uuid';
import Duedate from '../DueDate';
import moment from 'moment';
import calendar from '../../theme/assets/calendar.png';
import Modalprojects from '../ModalProjects';
import Modalusers from '../ModalUsers';
import PropTypes from 'prop-types';
import Styles from './styles';

export default class Modal extends Component {
    static propTypes = {
        closeModal:     PropTypes.func,
        modalActive:    PropTypes.bool,
        saveTask:       PropTypes.func,
        updateTodoList: PropTypes.func
    };

    constructor () {
        super();
        this.closeModal = ::this.closeModal;
        this.handlerEnter = ::this.handlerEnter;
        this.handleTextAreaChange = ::this.handleTextAreaChange;
        this.handleInputChange = ::this.handleInputChange;
        this.projectsListActive = ::this.projectsListActive;
        this.setDate = ::this.setDate;
        this.setProjectName = ::this.setProjectName;
        this.setUserName = ::this.setUserName;
        this.usersListActive = ::this.usersListActive;
    }

    state = {
        description:       '',
        finishDate:        '',
        id:                v4(),
        modalActive:       this.props,
        overdue:           'false',
        projectListActive: false,
        setDate:           false,
        taskDone:          'true',
        taskName:          '',
        taskProject:       '',
        taskUserName:      '',
        userListActive:    false
    };

    closeModal () {
        this.props.closeModal(false);
    }
    handleTextAreaChange (event) {
        const { value: description } = event.target;

        this.setState({
            description
        });
    }

    handleInputChange (event) {
        const { value: taskName } = event.target;

        this.setState({
            taskName
        });
    }

    setUserName (taskUserName) {
        if (taskUserName) {
            this.setState({
                taskUserName
            });
        }
    }
    setProjectName (taskProject) {
        if (taskProject) {
            this.setState({
                taskProject
            });
        }
    }

    handlerEnter (event) {
        const enterKey = event.keyCode;
        const {
            description,
            finishDate,
            overdue,
            taskName,
            taskProject,
            taskUserName
        } = this.state;

        const now = moment().format('YYYY-MM-DD');

        let duedate = '';

        if (finishDate) {
            duedate = moment(finishDate, 'YYYY-MM-DD').fromNow();

            if (finishDate > now) {
                this.setState({
                    overdue: 'false',
                    duedate: `Due Date finish ${duedate}`
                });
            } else {
                this.setState({
                    overdue: 'true',
                    duedate: `Due Date finished ${duedate}`
                });
            }
        }

        if (enterKey === 13) {
            event.preventDefault();

            if (taskName) {
                if (finishDate !== '') {
                    this.props.saveTask({
                        id:       v4(),
                        taskName,
                        description,
                        taskDone: 'false',
                        finishDate,
                        overdue,
                        taskProject,
                        taskUserName,
                        duedate
                    });
                } else {
                    this.props.saveTask({
                        id:       v4(),
                        taskName,
                        description,
                        taskDone: 'false',
                        taskProject,
                        taskUserName
                    });
                }

                this.props.closeModal(false);
                this.setState({
                    taskName:     '',
                    description:  '',
                    finishDate:   '',
                    taskProject:  '',
                    taskUserName: ''
                });
            } else {
                console.log(
                    'Input Task Name or Just press cross at the top right angle "x"!'
                );
            }
        }
        this.props.updateTodoList(); // ОБНОВЛЕНИЕ TODOS LIST ПРИ ЗАКРЫТИИ МОДАЛЬНОГО ОКНА
    }
    setDate (finishDate) {
        this.setState({
            setDate: true,
            finishDate
        });
    }

    usersListActive () {
        const userListActive = this.state.userListActive;

        if (!userListActive) {
            this.setState({
                userListActive: true
            });
        } else {
            this.setState({
                userListActive: false
            });
        }
    }
    projectsListActive () {
        const projectListActive = this.state.projectListActive;

        if (!projectListActive) {
            this.setState({
                projectListActive: true
            });
        } else {
            this.setState({
                projectListActive: false
            });
        }
    }

    render () {
        const { modalActive } = this.props;
        const {
            id: inputId,
            description,
            taskName,
            projectListActive,
            userListActive
        } = this.state;
        const setDate = this.state.setDate;

        if (modalActive) {
            return (
                <div className = { Styles.modal }>
                    <div className = { Styles.modalInner }>
                        <div className = { Styles.modalHead }>
                            <div
                                className = { Styles.close }
                                onClick = { this.closeModal }>
                                &times;
                            </div>
                        </div>
                        <form
                            className = { Styles.modalBody }
                            onKeyDown = { this.handlerEnter }>
                            <span
                                className = { Styles.username }
                                onClick = { this.usersListActive }>
                                <span className = { Styles.usernameImage }>
                                    &#8330;
                                </span>
                                <span className = { Styles.usernameText }>
                                    User Name
                                </span>
                            </span>
                            {userListActive ? (
                                <Modalusers
                                    setUserName = { this.setUserName }
                                    userListActive = { userListActive }
                                />
                            ) : null}
                            <span
                                className = { Styles.projectname }
                                onClick = { this.projectsListActive }>
                                <span className = { Styles.usernameImage }>
                                    &#8330;
                                </span>
                                <span className = { Styles.usernameText }>
                                    Project Name
                                </span>
                            </span>
                            {projectListActive ? (
                                <Modalprojects
                                    projectListActive = { projectListActive }
                                    setProjectName = { this.setProjectName }
                                />
                            ) : null}
                            <span
                                className = { Styles.calendar }
                                onClick = { this.setDate }>
                                <span className = { Styles.calendarImage }>
                                    <img alt = 'calendar' src = { calendar } />
                                </span>
                                <span className = { Styles.calendarText }>
                                    Due Date
                                </span>
                            </span>
                            {setDate ? (
                                <Duedate setDate = { this.setDate } />
                            ) : null}
                            <div className = { Styles.inputGroup }>
                                <input
                                    id = { inputId }
                                    placeholder = 'Task Name'
                                    value = { taskName }
                                    onChange = { this.handleInputChange }
                                />
                                <label htmlFor = { inputId }> &#10003; </label>
                            </div>
                            <textarea
                                placeholder = 'Description'
                                value = { description }
                                onChange = { this.handleTextAreaChange }
                            />
                        </form>
                    </div>
                </div>
            );
        }

        return null;
    }
}
