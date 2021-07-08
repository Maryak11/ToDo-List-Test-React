import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./AppWithReducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditTableSpan} from "./EditTableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";
//
// type TaskType = {
//     id: string,
//     title: string,
//     isDone: FilterValuesType
// }

type TaskPropsType = {
    tasks: TaskType,
    removeTask: (taskID: string, todoListID: string) => void,
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeCheckBoxValue: (taskId: string, isDone: boolean, todoListID: string) => void
    todoListID: string
}


export const Tasks = React.memo((props: TaskPropsType) => {

    let taskClass = props.tasks.isDone ? "isDone" : ""
    const removeTask = useCallback(() =>
        props.removeTask(props.tasks.id, props.todoListID),[props.removeTask, props.tasks.id, props.todoListID])

    const onChangeTask = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        props.changeCheckBoxValue(props.tasks.id, e.currentTarget.checked, props.todoListID),[ props.changeCheckBoxValue, props.tasks.id, props.todoListID])

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.tasks.id, title, props.todoListID)
    }, [  props.changeTaskTitle, props.tasks.id,  props.todoListID])

    return (
        <li key={props.tasks.id} className={taskClass}>
            <Checkbox
                color={"primary"}
                checked={props.tasks.isDone}
                onChange={onChangeTask}
            />
            <EditTableSpan title={props.tasks.title} changeTitle={changeTaskTitle}/>
            {/*<span>{t.title}</span>*/}
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})