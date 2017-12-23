import React, { Component } from 'react';
import Styles from './styles';
import { v4 } from 'uuid';

// INSTRUMENTS
// import {
//     CSSTransition,
//     Transition,
//     TransitionGroup
// } from 'react-transition-group';
// import { fromTo } from 'gsap';
// import Styles from './styles';

// COMPONENTS
import Createbutton from '../Createbutton';
import Todo from '../Todo';
import Date from '../Date';
import Createuser from '../Createuser';
import User from '../User';
import Createproject from '../Createproject';
import Project from '../Project';

export default class Feed extends Component {
    constructor () {
        super();
        this.addNewProject = ::this.addNewProject;
        this.addNewUser = ::this.addNewUser;
        this.checkTask = ::this.checkTask;
        this.deleteTask = ::this.deleteTask;
        this.saveTask = ::this.saveTask;
        this.saveProject = ::this.saveProject;
        this.saveUser = ::this.saveUser;
        this.tasksFilterByProject = ::this.tasksFilterByProject;
        this.tasksFilterByUsername = ::this.tasksFilterByUsername;
        this.updateTodoList = ::this.updateTodoList;
        this.updateUserList = ::this.updateUserList;
        this.updateProjectList = ::this.updateProjectList;
    }
    state = {
        showModal:        false,
        todosArr:         [],
        checkedTaskIndex: 'false',
        inputName:        false,
        inputProjectName: false,
        users:            [],
        projects:         []
    };

    componentDidMount () {
        this.updateTodoList();
        this.updateUserList();
        this.updateProjectList();
    }

    componentWillMount () {
        this.updateTodoList();
        this.updateUserList();
        this.updateProjectList();
    }

    updateTodoList () {
        const todos = JSON.parse(localStorage.getItem('todos'));

        if (!todos) {
            this.setState({
                todosArr: false
            });
        } else {
            this.setState({
                todosArr: todos
            });
        }
    }
    updateUserList () {
        const users = JSON.parse(localStorage.getItem('users'));

        if (!users) {
            this.setState({
                users: false
            });
        } else {
            this.setState({
                users
            });
        }
    }
    updateProjectList () {
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

    saveTask (todo) {
        let todos = localStorage.getItem('todos');
        const todosArr = JSON.parse(todos);

        if (!todos) {
            todos = [todo];
            localStorage.setItem('todos', JSON.stringify(todos));
            this.setState({
                todosArr: todos
            });
        } else {
            todos = localStorage.setItem(
                'todos',
                JSON.stringify([...todosArr, todo])
            );
            this.setState({
                todosArr
            });
        }
    }

    saveUser (user) {
        let users = JSON.parse(localStorage.getItem('users'));

        user = user.user;
        if (!users) {
            users = [user];
            localStorage.setItem('users', JSON.stringify(users));
            this.setState({
                users
            });
        } else {
            users = [user, ...users];
            users = localStorage.setItem('users', JSON.stringify(users));
            this.setState({
                users
            });
        }
    }
    saveProject (project) {
        let projects = JSON.parse(localStorage.getItem('projects'));

        project = project.project;
        if (!projects) {
            projects = [project];
            localStorage.setItem('projects', JSON.stringify(projects));
            this.setState({
                projects
            });
        } else {
            projects = [project, ...projects];
            projects = localStorage.setItem(
                'projects',
                JSON.stringify(projects)
            );
            this.setState({
                projects
            });
        }
    }

    deleteTask (id) {
        let todos = localStorage.getItem('todos');
        const todosArr = JSON.parse(todos);

        todos = todosArr.filter((todo) => todo.id !== id);
        this.setState({
            todosArr: todos
        });
        if (todos.length == 0) {
            localStorage.clear();
        } else {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }

    checkTask (id) {
        const todos = localStorage.getItem('todos');
        const todosArr = JSON.parse(todos);
        const checked = todosArr.findIndex((todo) => todo.id == id);
        const todoStatus = todosArr[checked].taskDone;

        if (todoStatus == 'false') {
            todosArr[checked].taskDone = 'true';
        } else {
            todosArr[checked].taskDone = 'false';
        }
        this.setState({
            todosArr,
            checked
        });
        localStorage.setItem('todos', JSON.stringify(todosArr));
    }
    addNewUser (status) {
        this.setState({
            inputName: status
        });
    }
    addNewProject (status) {
        this.setState({
            inputProjectName: status
        });
    }
    tasksFilterByUsername (usernameFilter) {
        const todos = localStorage.getItem('todos');
        const todosArr = JSON.parse(todos);

        if (todosArr) {
            const filteredTodoByUsername = todosArr.filter((todo) => {
                if (todo.taskUserName == usernameFilter) {
                    return true;
                }

                return false;

            });

            this.setState({
                todosArr: filteredTodoByUsername
            });
        }
    }
    tasksFilterByProject (projectFilter) {
        const todos = localStorage.getItem('todos');
        const todosArr = JSON.parse(todos);

        if (todosArr) {
            const filteredTodoByProject = todosArr.filter((todo) => {
                if (todo.taskProject == projectFilter) {
                    return true;
                }

                return false;

            });

            this.setState({
                todosArr: filteredTodoByProject
            });
        }
    }

    render () {
        const {
            inputName,
            inputProjectName,
            projects,
            todosArr,
            users
        } = this.state;

        if (todosArr) {
            var todo = todosArr.map((props) => (
                <Todo
                    classes = {
                        props.taskDone == 'true' ? Styles.todone : Styles.todo
                    }
                    canDelete = { props.taskDone == 'true' ? 'true' : 'false' }
                    checkTask = { this.checkTask }
                    deleteTask = { this.deleteTask }
                    description = { props.description }
                    duedate = { props.duedate ? props.duedate : null }
                    finishDate = { props.finishDate ? props.finishDate : null }
                    key = { props.id }
                    id = { props.id }
                    overdue = { props.overdue }
                    taskName = { props.taskName }
                    taskProject = { props.taskProject }
                    taskUserName = { props.taskUserName }
                />
            ));
        }
        if (users) {
            var user = users.map((props) => (
                <User
                    key = { v4() }
                    tasksFilterByUsername = { this.tasksFilterByUsername }
                    user = { props }
                />
            ));
        }
        if (projects) {
            var project = projects.map((props) => (
                <Project
                    key = { v4() }
                    tasksFilterByProject = { this.tasksFilterByProject }
                    project = { props }
                />
            ));
        }

        return (
            <div className = { Styles.feed }>
                <div className = { Styles.left }>
                    <Createbutton
                        saveTask = { this.saveTask }
                        updateTodoList = { this.updateTodoList }
                    />
                    <Date />
                    {users ? (
                        <ul className = { Styles.feedUsers }>{[user]}</ul>
                    ) : null}
                    <Createuser
                        addNewUser = { this.addNewUser }
                        inputName = { inputName }
                        saveUser = { this.saveUser }
                        updateUserList = { this.updateUserList }
                    />
                    <div className = { Styles.projects }>
                        {projects ? (
                            <ul className = { Styles.feedProjects }>{[project]}</ul>
                        ) : null}
                        <Createproject
                            addNewProject = { this.addNewProject }
                            inputProjectName = { inputProjectName }
                            saveProject = { this.saveProject }
                            updateProjectList = { this.updateProjectList }
                        />
                    </div>
                </div>
                {todosArr ? (
                    <div className = { Styles.right }>
                        <ul>{todo}</ul>
                    </div>
                ) : (
                    <div className = { Styles.right }>
                        <p className = { Styles.notask }>There are no tasks. </p>
                    </div>
                )}
            </div>
        );
    }
}
