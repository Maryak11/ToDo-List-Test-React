import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistReducer,

} from "./state/todolist-reducer";
import {taskReducer, removeTaskAC, changeTaskTitleAC, changeTaskStatusAC, AddTasksAC} from './state/task-reducer'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ToDoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux() {

    const todoList = useSelector<AppRootStateType, ToDoListType[]>(
        state => state.todolists
    )
    const tasks = useSelector<AppRootStateType, TasksStateType>(
        state => state.tasks
    )
    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [])
    const removeToDoList = useCallback((todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
        dispatch(action)

    }, [])
    const changeTodoListFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        let action = changeTodoListFilterAC(filterValue, todoListID)
        dispatch(action)
    }, [])
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [])
    const changeCheckBoxValue = useCallback((taskId: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListID))
    }, [])
    const changeTaskTitle = useCallback((taskId: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListID))
    }, [])
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(AddTasksAC(title, todoListID))
    }, [])
    const addToDoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [])

    const todoListTask = todoList.map(t => {
        return (
            <Grid item key={t.id}>
                <Paper elevation={8} style={{padding: "30px"}}>
                    <Todolist

                        todoListID={t.id}
                        title={t.title}
                        tasks={tasks[t.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeCheckBoxValue={changeCheckBoxValue}
                        filter={t.filter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                        removeToDoList={removeToDoList}
                    />
                </Paper>
            </Grid>
        )

    })
    return (
        <div className={"App"}>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        TodoLists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListTask}
                </Grid>
            </Container>
        </div>

    );
}

export default AppWithRedux;
