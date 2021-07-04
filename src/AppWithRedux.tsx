import React, {useReducer, useState} from 'react';
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
import {taskReducer,removeTaskAC, changeTaskTitleAC, changeTaskStatusAC, AddTasksAC} from './state/task-reducer'
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

    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    function removeToDoList(todoListID: string) {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
        dispatch(action)

    }
    function changeTodoListFilter(filterValue: FilterValuesType, todoListID: string){
        let action = changeTodoListFilterAC(filterValue, todoListID)
        dispatch(action)
    }
    function changeTodoListTitle(title: string, todoListID: string){
        dispatch(changeTodoListTitleAC(title, todoListID))
    }
    function changeCheckBoxValue(taskId: string, isDone: boolean, todoListID: string) {
       dispatch(changeTaskStatusAC(taskId, isDone, todoListID))
    }
    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
       dispatch(changeTaskTitleAC(taskId, title, todoListID))
    }
    const addTask = (title: string, todoListID: string) => {
       dispatch(AddTasksAC(title, todoListID))
    }
    function addToDoList(title: string) {
        dispatch(addTodoListAC(title))
    }

    function sortedTask(t: ToDoListType) {
        switch (t.filter) {
            case "active":
                return tasks[t.id].filter(t => !t.isDone)
            case "completed":
                return tasks[t.id].filter(t => t.isDone)
            default:
                return tasks[t.id]
        }
    }

    const todoListTask = todoList.map(t => {
        return (
            <Grid item key={t.id} >
            <Paper elevation={8} style = {{padding: "30px"}}>
            <Todolist

            todoListID = {t.id}
            title={t.title}
            tasks={sortedTask(t)}
            removeTask={removeTask}
            addTask={addTask}
            changeTodoListFilter={changeTodoListFilter}
            changeCheckBoxValue={changeCheckBoxValue}
            filter={t.filter}
            changeTaskTitle = {changeTaskTitle}
            changeTodoListTitle={ changeTodoListTitle}
            removeToDoList = {removeToDoList}
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
