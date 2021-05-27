import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

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

type TasksStateType = {
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
    function changeTodoListFilter(filterValue: FilterValuesType, todoListID: string){
        setTodoLists(todoList.map(t => t.id === todoListID ? {...t, filter: filterValue} : t))
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
//sdsdfsdfsdf
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
        return <Todolist
            key={t.id}
            todoListID = {t.id}
            title={t.title}
            tasks={sortedTask(t)}
            removeTask={removeTask}
            addTask={addTask}
            changeTodoListFilter={changeTodoListFilter}
            changeCheckBoxValue={changeCheckBoxValue}
            deleteTodoList = {deleteTodoList}
            filter={t.filter}
        />

    })
    return (
        <div>
            {todoListTask}
        </div>

    );
}

export default App;
