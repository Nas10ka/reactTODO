import React, { Component } from 'react';
import Styles from './styles';

export default class Createproject extends Component {
    constructor () {
        super();
        this.addProject = ::this.addProject;
        this.handlerEnterProjectName = ::this.handlerEnterProjectName;
        this.handleInputProjectNameChange = ::this.handleInputProjectNameChange;
    }
    state = {
        inputProjectName: this.props,
        project:          ''
    };

    handlerEnterProjectName (event) {
        const spaceKey = event.keyCode;
        const project = this.state.project;

        if (spaceKey === 32) {
            event.preventDefault();
            if (project) {
                this.props.saveProject({
                    project
                });
            }
            this.props.addNewProject(false);
            this.setState({
                project
            });
        }
        this.props.updateProjectList();
    }

    handleInputProjectNameChange (event) {
        const { value: project } = event.target;

        this.setState({
            project
        });
    }
    addProject () {
        this.props.addNewProject(true);
    }

    render () {
        const { inputProjectName } = this.props;
        const { project } = this.state;

        return (
            <div>
                <div
                    onClick = { this.addProject }
                    className = { Styles.addProject }
                    title = 'Add new project name - press space bar'>
                    Create New Project
                </div>
                {inputProjectName ? (
                    <input
                        className = { Styles.addNewProject }
                        onKeyDown = { this.handlerEnterProjectName }
                        onChange = { this.handleInputProjectNameChange }
                        placeholder = 'Add new Project'
                        type = 'text'
                        value = { project }
                    />
                ) : null}
            </div>
        );
    }
}
