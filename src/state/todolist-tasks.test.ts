import {TasksStateType, ToDoListType} from "../App";
import {taskReducer} from "./task-reducer";
import {addTodoListAC, removeTodoListAC, todolistReducer} from "./todolist-reducer";
let startState: TasksStateType
let startTasksState: TasksStateType
let startTodolistsState: Array<ToDoListType>

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    startTasksState = {}
    startTodolistsState = []
})
test('ids should be equals', () => {

    const action = addTodoListAC("new todolist");
    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todolistId2");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
