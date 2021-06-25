import {FilterValuesType, TasksStateType, ToDoListType} from "../App";
import {v1} from "uuid";
import {addTodoListType, removeToDoList} from "./todolist-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskID: string,
    todoListId: string
}

type AddTaskActionType = {
    type: "ADD-TASK",
    todoListId: string,
    title: string
}
type ChangeIsDone = {
    type: "CHANGE-ISDONE",
    taskId: string,
    isDone: boolean,
    todoListID: string
}
type ChangeTitleTask = {
    type: "CHANGE-TITLE",
    taskId: string,
    title: string,
    todoListID: string
}



export type ActionType =
    AddTaskActionType | RemoveTaskActionType | ChangeIsDone | ChangeTitleTask | addTodoListType | removeToDoList


export const taskReducer = (state: TasksStateType, action: ActionType) => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskID)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todoListId]: [{
                    id: v1(),
                    title: action.title,
                    isDone: false
                }, ...state[action.todoListId]]
            }
        case "CHANGE-ISDONE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskId
                    ?{...task, isDone: action.isDone}
                    :{...task})
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.taskId
                    ?{...task, title: action.title}
                    :{...task})
            }
        case "ADD-TODOLIST":
            return {
                ...state,
               [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.todoListID]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todoListId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todoListId
    }
}
export const AddTasksAC = (title: string, todoListId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        todoListId,
        title
    }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): ChangeIsDone => {
    return {
        type: "CHANGE-ISDONE",
        taskId,
        isDone,
        todoListID
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTitleTask => {
    return {
        type: "CHANGE-TITLE",
        taskId,
        title,
        todoListID
    }
}
