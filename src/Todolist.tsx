import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Tasks} from "./Tasks";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheckBoxValue: (taskId: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    todoListID: string
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    removeToDoList: (todoListID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Render TODO List')


    const removeToDoList = useCallback(() => props.removeToDoList(props.todoListID),[props.removeToDoList, props.todoListID])
    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID), [props.addTask, props.todoListID])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }, [ props.changeTodoListTitle, props.todoListID ])

    let tasksForToDoList = props.tasks

    if (props.filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
    }

    const removeTask = useCallback((taskId: string, todoListID: string) =>
        props.removeTask(taskId, todoListID), [props.removeTask])

    const onChangeTask = useCallback((taskId: string,newIsDoneValue: boolean, todoListID: string) =>
        props.changeCheckBoxValue(taskId, newIsDoneValue, todoListID), [props.changeCheckBoxValue])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        props.changeTaskTitle(taskId, newTitle, todoListID)
    }, [props.changeTaskTitle])

    return <div>
        <h3>
            <EditTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton onClick={removeToDoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: "none", padding: "0px"}}>
            {tasksForToDoList.map(t => {
               return <Tasks
                    key = {t.id}
                    tasks={t}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
                    changeCheckBoxValue={onChangeTask}
                    todoListID={props.todoListID}
                />
            })}

        </ul>



        <div>
            <Button
                size={"small"}
                variant={props.filter === "all" ? "contained" : "outlined"}
                color={"default"}
                onClick={() => props.changeTodoListFilter('all', props.todoListID)}

            >All
            </Button>
            <Button
                size={"small"}
                variant={props.filter === "active" ? "contained" : "outlined"}
                color={"default"}
                onClick={() => props.changeTodoListFilter('active', props.todoListID)}

            >Active
            </Button>
            <Button
                size={"small"}
                variant={props.filter === "completed" ? "contained" : "outlined"}
                color={"default"}
                onClick={() => props.changeTodoListFilter('completed', props.todoListID)}

            >Completed
            </Button>
        </div>
    </div>
})