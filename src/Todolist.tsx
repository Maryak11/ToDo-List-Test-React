import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheckBoxValue: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    deleteTodoList: (todoListID: string) => void
    todoListID: string
    changeTaskTitle:(taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle:(title: string, todoListID: string) => void
    removeToDoList:(todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const tasksJSX = props.tasks.map(t => {
            let taskClass = t.isDone ? "isDone" : ""
            const removeTask = () => props.removeTask(t.id, props.todoListID)

            const onChangeTask = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeCheckBoxValue(t.id, e.currentTarget.checked, props.todoListID)

            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(t.id, title, props.todoListID)
            }


            return (
                <li key={t.id} className={taskClass}>
                    <Checkbox
                       color={"primary"}
                        checked={t.isDone}
                        onChange={onChangeTask}
                    />
                    <EditTableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    {/*<span>{t.title}</span>*/}
                    <IconButton onClick={removeTask}>
                        <Delete />
                    </IconButton>
                </li>
            )
        }
    )

    const removeToDoList = () => props.removeToDoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return <div>
        <h3>
            <EditTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton onClick={removeToDoList}>
                <Delete />
                </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: "none", padding: "0px"}}>
            {tasksJSX}
        </ul>
        <div>
            <Button
                size={"small"}
                variant={props.filter === "all" ?  "contained" : "outlined"}
                color={"secondary"}
                onClick={() => props.changeTodoListFilter('all', props.todoListID)}

            >All
            </Button>
            <Button
                size={"small"}
                variant={props.filter === "active" ? "contained" : "outlined"}
                color={"secondary"}
                onClick={() => props.changeTodoListFilter('active', props.todoListID)}

            >Active
            </Button>
            <Button
                size={"small"}
                variant={props.filter === "completed" ? "contained" : "outlined"}
                color={"secondary"}
                onClick={() => props.changeTodoListFilter('completed', props.todoListID)}

            >Completed
            </Button>
        </div>
    </div>
}
