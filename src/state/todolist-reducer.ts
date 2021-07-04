import {FilterValuesType, TasksStateType, ToDoListType} from "../App";
import {v1} from "uuid";

export type removeToDoList = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type addTodoListType = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}

type changeTodoListFilterType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType,
    todoListID: string
}

type changeTodoListTitleType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string,
    todoListID: string
}

export type ActionType =
    removeToDoList |
    addTodoListType |
    changeTodoListFilterType |
    changeTodoListTitleType
const InitialState: ToDoListType[] = []

export const todolistReducer = (todoLists = InitialState, action:ActionType ) => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(t => t.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newToDoList: ToDoListType = {
                id: action.todoListID,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newToDoList]
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(t => t.id === action.todoListID ? {...t, filter: action.filter} : t)
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(t => t.id === action.todoListID ? {...t, title: action.title} : t)
        default:
            return todoLists
    }
}
export const removeTodoListAC = (todoListID: string): removeToDoList => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID
    }
}

export const addTodoListAC = (title: string): addTodoListType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todoListID: v1()
    }
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): changeTodoListFilterType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todoListID
    }
}
export const changeTodoListTitleAC = (title: string, todoListID: string): changeTodoListTitleType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListID
    }
}
