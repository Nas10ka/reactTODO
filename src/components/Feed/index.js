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

export default class Feed extends Component {
    constructor () {
        super();
        this.addNewUser = ::this.addNewUser;
        this.checkTask = ::this.checkTask;
        this.deleteTask = ::this.deleteTask;
        this.saveTask = ::this.saveTask;
        this.saveUser = ::this.saveUser;
        this.updateTodoList = ::this.updateTodoList;
        this.updateUserList = ::this.updateUserList;
        this.tasksFilterByUsername = ::this.tasksFilterByUsername;
    }
    state = {
        showModal:        false,
        todosArr:         [],
        checkedTaskIndex: 'false',
        inputName:        false,
        users:            []
    };

    componentDidMount () {
        this.updateTodoList();
        this.updateUserList();
    }

    componentWillMount () {
        this.updateTodoList();
        this.updateUserList();
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
    tasksFilterByUsername (usernameFilter) {
        let todos = localStorage.getItem('todos');
        const todosArr = JSON.parse(todos);
        if (todosArr) {
            const filteredTodoByUsername = todosArr.filter((obj, i) => {
                if (obj.taskUserName == usernameFilter) {
                    return true;
                } else {
                    return false;
                }

            });

            this.setState({
                todosArr: filteredTodoByUsername
            });
        }
    }

    render () {
        const { inputName, todosArr, users } = this.state;

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
