import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';

export default class Project extends Component {
    static propTypes = {
        choseProjectName:     PropTypes.func,
        modalIs:              PropTypes.bool,
        project:              PropTypes.any,
        tasksFilterByProject: PropTypes.func
    };

    constructor () {
        super();
        this.choseProject = ::this.choseProject;
        this.getNameFirstLetter = ::this.getNameFirstLetter;
        this.setProjectToTask = ::this.setProjectToTask;
    }
    state = {
        project:     '',
        firstLetter: ''
    };
    componentWillMount () {
        this.getNameFirstLetter();
    }
    setProjectToTask () {
        const { project } = this.props;

        this.props.choseProjectName(project);
    }
    getNameFirstLetter () {
        const { project } = this.props;
        const firstLetter = project[0];

        this.setState({
            firstLetter
        });
    }
    choseProject () {
        const { project } = this.props;

        this.props.tasksFilterByProject(project);
    }
    render () {
        const { project, modalIs } = this.props;

        if (modalIs) {
            return (
                <li
                    className = { Styles.modalProject }
                    onClick = { this.setProjectToTask }>
                    {project}
                </li>
            );
        }

        return (
            <li className = { Styles.project } onClick = { this.choseProject }>
                {project}
            </li>
        );
    }
}
