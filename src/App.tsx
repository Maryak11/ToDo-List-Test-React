import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoList, setTodoLists] = useState<ToDoListType[]>([
        {id: todoListID_1, title: "What to Learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks(copyTasks)
    }
    function removeToDoList(todoListID: string) {
        setTodoLists(todoList.filter(t => t.id !== todoListID))
    }
    function changeTodoListFilter(filterValue: FilterValuesType, todoListID: string){
        setTodoLists(todoList.map(t => t.id === todoListID ? {...t, filter: filterValue} : t))
    }
    function changeTodoListTitle(title: string, todoListID: string){
        setTodoLists(todoList.map(t => t.id === todoListID ? {...t, title} : t))
    }
    function deleteTodoList (todoListID: string) {
        setTodoLists(todoList.filter(t => t.id !== todoListID))
        delete tasks[todoListID]
    }
    function changeCheckBoxValue(taskId: string, isDone: boolean, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(copyTasks)
    }
    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskId ? {...t, title} : t)
        setTasks(copyTasks)
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const copyTasks = {...tasks}
        copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTasks)
    }
    function addToDoList(title: string) {
        const newToDoListID = v1()
        const newToDoList:ToDoListType = {
            id: newToDoListID,
            title,
            filter: "all"
        }
        setTodoLists([...todoList, newToDoList])
        setTasks({...tasks, [newToDoListID]: []})
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
            deleteTodoList = {deleteTodoList}
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

export default App;
