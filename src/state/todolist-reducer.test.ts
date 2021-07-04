import {v1} from 'uuid';
import {ActionType, todolistReducer} from "./todolist-reducer";
import {FilterValuesType, ToDoListType} from "../App";
let todolistId1: string
let todolistId2: string
let startState: Array<ToDoListType>
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {


    const endState = todolistReducer(startState, { type: 'REMOVE-TODOLIST', todoListID: todolistId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle, todoListID: v1()})

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListID: todolistId2,
        filter: newFilter
    };

    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: ActionType = {
        type: "CHANGE-TODOLIST-TITLE",
        title: newTodolistTitle,
        todoListID: todolistId2
    };

    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
