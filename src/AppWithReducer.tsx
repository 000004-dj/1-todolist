import React, {useReducer} from 'react';
import './App.css';
import Todolist from './Components/ToDoList/Todolist'
import {v1} from "uuid"
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {Header} from "./Components/Header/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddNewTodoListAC,
    ChangeTodoListFilterAC, ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from "./redux/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./redux/tasks-reducer";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type FilterValuesType = "all" | "active" | "completed"
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
//     // tasks: Array<TaskType>
// }
// export type TasksStateType = {
//     [todoListId: string]: Array<TaskType>
// }

function AppWithReducer() {
    const id_1 = v1();
    const id_2 = v1();

    const [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
        {id: id_1, title: "What to learn", filter: "all"},
        {id: id_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [id_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true,},
            {id: v1(), title: "Js", isDone: true,},
            {id: v1(), title: "React", isDone: false,}
        ],
        [id_2]: [
            {id: v1(), title: "Milk", isDone: true,},
            {id: v1(), title: "Meat", isDone: true,},
            {id: v1(), title: "Wheat", isDone: false,}
        ]
    })


    const removeTask = (taskId: string, todoListId: string) => dispatchTasks(
        removeTaskAC(taskId, todoListId)
    )
    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: any, isDone: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, title, todoListId))
    }
    const getFilteredTasks = (task: Array<TaskType>, filter: FilterValuesType) => {
        switch (filter) {
            case "completed":
                return task.filter(task => task.isDone)
            case "active":
                return task.filter(task => !task.isDone)
            default :
                return task
        }

    }


    const removeTodoList = (todoListId: string) => {
        let action = RemoveTodoListAC(todoListId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const changeTodolistFilter = (nextFilterValue: FilterValuesType, todoListId: string) =>
        dispatchTodoLists(ChangeTodoListFilterAC(nextFilterValue, todoListId))

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchTodoLists(ChangeTodoListTitleAC(title, todoListId))
    }
    const addNewToDoList = (title: string) => {
        let action = AddNewTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }


    const todoListsComponents = todoLists.map((tl) => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid item>
                <Paper sx={{p: "20px"}} elevation={16}>
                    <Todolist
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tl.filter}

                        updatedTasks={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div>
            <Header/>
            <Container fixed>
                <Grid container sx={{p: "10px 0px"}}>
                    <AddItemForm addItem={addNewToDoList}/>
                </Grid>
                <Grid container spacing={6}>
                    {todoListsComponents}
                </Grid>

            </Container>

        </div>
    )
}


export default AppWithReducer
