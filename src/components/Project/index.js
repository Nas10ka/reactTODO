import React, { Component } from 'react';
import Styles from './styles';

export default class Project extends Component {
    constructor () {
        super();
        this.choseProject = ::this.choseProject;
        this.getNameFirstLetter = ::this.getNameFirstLetter;
        this.setProjectToTask = ::this.setProjectToTask;
    }
    state = {
        project:     this.props,
        firstLetter: 'A'
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
        const { firstLetter } = this.state;

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
