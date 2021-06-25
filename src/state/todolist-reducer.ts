import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";

type removeToDoList = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

type addTodoListType = {
    type: "ADD-TODOLIST"
    title: string
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


export const todolistReducer = (todoLists: ToDoListType[], action:ActionType ) => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(t => t.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newToDoListID = v1()
            const newToDoList: ToDoListType = {
                id: newToDoListID,
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