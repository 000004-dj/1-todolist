import {TasksStateType} from "../App";
import {ADD_NEW_TODOLIST, AddNewTodoListAT, REMOVE_TODOLIST, RemoveTodoListAT} from "./todolist-reducer";

//Actions Types:
type ActionType = RemoveTaskAT
    | AddTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | AddNewTodoListAT
    | RemoveTodoListAT


type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

//Constants with actions names:
export const REMOVE_TASK = "REMOVE-TASK" as const
export const ADD_TASK = "ADD-TASK" as const
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS" as const
export const CHANGE_TASK_VALUE = "CHANGE-TASK-VALUE" as const

//function-reducer:
export const tasksReducer = (tasks: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...tasks,
                [action.todoListId]: tasks[action.todoListId].filter(i => i.id !== action.taskId)
            }
        case ADD_TASK:
            return {
                ...tasks,
                [action.todoListId]: [...tasks[action.todoListId], {
                    id: [action.todoListId.length + 1], title: action.taskText, isDone: false
                }]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...tasks,
                [action.todoListId]: tasks[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case CHANGE_TASK_VALUE:
            return {
                ...tasks,
                [action.todoListId]: tasks[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case ADD_NEW_TODOLIST:
            return {
                ...tasks,
                [action.todoListId]: []
            }
        case REMOVE_TODOLIST: {
            let copyState = {...tasks}
            delete copyState[action.id]
            return copyState
        }
        default:
            return tasks
    }

}

//Action Creators:
export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        taskId,
        todoListId,
    } as const
}
export const addTaskAC = (taskText: string, todoListId: string) => {
    return {
        type: "ADD-TASK",
        taskText,
        todoListId,
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId,
        isDone,
        todoListId,

    } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {
        type: "CHANGE-TASK-VALUE",
        taskId,
        title,
        todoListId,

    } as const
}

// export const addTodolistAC = (todoListTitle: string) => {
//     return {
//         type: ADD_NEW_TODOLIST,
//         text: todoListTitle
//     } as const
// }
