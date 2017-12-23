import React, { Component } from 'react';
import { v4 } from 'uuid';
import Styles from './styles';
import Project from '../Project';

export default class Modalprojects extends Component {
    constructor () {
        super();
        this.choseProjectName = ::this.choseProjectName;
        this.getProjectList = ::this.getProjectList;
    }
    state = {
        projects:          [],
        projectListActive: false,
        taskProject:       ''
    };
    componentWillMount () {
        const { projectListActive } = this.props;

        this.setState({
            projectListActive
        });

        this.getProjectList();
    }
    getProjectList () {
        const projects = JSON.parse(localStorage.getItem('projects'));

        if (!projects) {
            this.setState({
                projects: false
            });
        } else {
            this.setState({
                projects
            });
        }
    }
    choseProjectName (taskProject) {
        this.props.setProjectName(taskProject);
        this.setState({
            projectListActive: false,
            taskProject
        });
    }
    render () {
        const { projects, projectListActive, taskProject } = this.state;

        if (projects) {
            var project = projects.map((props) => (
                <Project
                    choseProjectName = { this.choseProjectName }
                    key = { v4() }
                    project = { props }
                    modalIs
                />
            ));
        }

        if (projectListActive) {
            return (
                <div>
                    {projects ? (
                        <ul className = { Styles.modalprojects }>{[project]}</ul>
                    ) : (
                        <ul className = { Styles.modalprojects }>No projects :(</ul>
                    )}
                </div>
            );
        } else if (taskProject) {
            return (
                <h3>
                    <span>Project Name: </span>
                    {taskProject}
                </h3>
            );
        }

        return null;
    }
}
