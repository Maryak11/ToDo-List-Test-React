import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

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
}

export function Todolist(props: PropsType) {

    const tasksJSX = props.tasks.map(t => {
        let taskClass =  t.isDone ? "isDone" : ""
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const onChangeTask = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeCheckBoxValue(t.id, e.currentTarget.checked, props.todoListID)
            return (
                <li key={t.id} className = {taskClass}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={onChangeTask}
                    />
                    <span>{t.title}</span>
                    <button onClick={removeTask}>Delete</button>
                </li>
            )
        }
    )
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        let validated = title.trim()
        if (validated) {
            props.addTask(validated, props.todoListID)
            setTitle("")
        } else {
            setError(true)
        }


    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={onChangeTitle}
                className={error ? "error": ""}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {tasksJSX}
        </ul>
        <div>
            <button onClick={() => props.changeTodoListFilter('all', props.todoListID)}
                    className={props.filter === "all" ? "buttonActive" : ""}>
                All
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
