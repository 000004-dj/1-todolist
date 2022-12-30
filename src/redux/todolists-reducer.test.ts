import {v1} from "uuid";
import {TodoListType} from "../App";
import {
    AddNewTodoListAC,
    ChangeTodoListFilterAC, ChangeTodoListTitleAC,
    REMOVE_TODOLIST,
    RemoveTodoListAC,
    todolistReducer
} from "./todolist-reducer";

test("correct todolist should be removed", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startsState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistReducer(startsState, RemoveTodoListAC(todolistId1))


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})
test("correct todolist should be added", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const testTitle = "Hello, it's test";
    const startsState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistReducer(startsState, AddNewTodoListAC(testTitle))


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(testTitle)
})
test("correct todolist should be filtered", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const testFilterValue = "completed";
    const startsState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistReducer(startsState, ChangeTodoListFilterAC(testFilterValue, todolistId1))


    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe(testFilterValue)

})
test("todolist title should be changed", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const testNewTitle = "New Title";
    const startsState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistReducer(startsState, ChangeTodoListTitleAC(testNewTitle, todolistId1))


    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(testNewTitle)

})
