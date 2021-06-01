import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditTableSpan} from "./EditTableSpan";

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
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeTask}
                    />
                    <EditTableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    {/*<span>{t.title}</span>*/}
                    <button onClick={removeTask}>Delete</button>
                </li>
            )
        }
    )


    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return <div>
        <h3>{props.title}
            <EditTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {tasksJSX}
        </ul>
        <div>
            <button onClick={() => props.changeTodoListFilter('all', props.todoListID)}
                    className={props.filter === "all" ? "buttonActive" : ""}
            >All
            </button>
            <button onClick={() => props.changeTodoListFilter('active', props.todoListID)}
                    className={props.filter === "active" ? "buttonActive" : ""}
            >Active
            </button>
            <button onClick={() => props.changeTodoListFilter('completed', props.todoListID)}
                    className={props.filter === "completed" ? "buttonActive" : ""}
            >Completed
            </button>
        </div>
    </div>
}
