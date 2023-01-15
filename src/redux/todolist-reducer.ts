import {TodoListType} from "../App";
import {v1} from "uuid";


//Constants with actions names:
export const REMOVE_TODOLIST = "REMOVE-TODOLIST" as const
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER" as const
export const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE" as const
export const ADD_NEW_TODOLIST = "ADD-NEW-TODOLIST" as const

const initialState: InitialStateType = []

//function-reducer:
export const todolistReducer = (todoLists: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.id);
        case ADD_NEW_TODOLIST:
            return [
                ...todoLists,
                {
                    id: action.todoListId,
                    filter: "all",
                    title: action.text,
                }
            ]
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.nextFilterValue} : tl)
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return todoLists
    }

}

//Action Creators:
export const RemoveTodoListAC = (id: string) => {
    return {
        type: REMOVE_TODOLIST,
        id: id
    }
}
export const AddNewTodoListAC = (text: string) => {
    return {
        type: ADD_NEW_TODOLIST,
        text: text,
        todoListId: v1()
    }
}
export const ChangeTodoListFilterAC = (nextFilterValue: FilterValuesType, todoListId: string) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        nextFilterValue: nextFilterValue,
        todoListId: todoListId
    }
}
export const ChangeTodoListTitleAC = (title: string, todoListId: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        title: title,
        todoListId: todoListId
    }
}


type InitialStateType = []
//Filters Types:
type FilterValuesType = "all" | "active" | "completed"
//Actions Types:
type ActionType = RemoveTodoListAT | AddNewTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT
export type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export type AddNewTodoListAT = {
    type: typeof ADD_NEW_TODOLIST
    text: string
    todoListId: string
}
type ChangeTodoListFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER
    nextFilterValue: FilterValuesType
    todoListId: string
}
type ChangeTodoListTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    title: string
    todoListId: string
}
