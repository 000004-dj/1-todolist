import React from 'react';
import './App.css';
import Todolist from './Components/ToDoList/Todolist'
import {AddItemForm} from "./Components/AddItemForm/AddItemForm";
import {Header} from "./Components/Header/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddNewTodoListAC,
    ChangeTodoListFilterAC, ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./redux/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}


function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
    const dispatch = useDispatch()

    const removeTask = (taskId: string, todoListId: string) => dispatch(
        removeTaskAC(taskId, todoListId)
    )
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: any, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
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
        dispatch(action)
        // dispatch(action)
    }
    const changeTodolistFilter = (nextFilterValue: FilterValuesType, todoListId: string) =>
        dispatch(ChangeTodoListFilterAC(nextFilterValue, todoListId))

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(title, todoListId))
    }
    const addNewToDoList = (title: string) => {
        let action = AddNewTodoListAC(title)
        dispatch(action)
        // dispatch(action)
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


export default AppWithRedux
