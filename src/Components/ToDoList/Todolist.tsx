import React, {ChangeEvent, memo, useCallback} from "react";
import {FilterValuesType, TaskType} from "../../App";
import s from "./ToDoList.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton, List, Typography} from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import {Task} from "../Task/Task"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (TaskId: string, todoListId: string) => void
    changeTodolistFilter: (changeTodolistFilter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, checked: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    todoListId: string
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}

const Todolist = memo((props: TodolistPropsType) => {
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])

    const getFilteredTasks = useCallback((task: Array<TaskType>, filter: FilterValuesType) => {
        switch (filter) {
            case "completed":
                return task.filter(task => task.isDone)
            case "active":
                return task.filter(task => !task.isDone)
            default :
                return task
        }

    }, [])
    let tasks = getFilteredTasks(props.tasks, props.filter)

    // const haveTasks = () => tasks.length ? tasks.map(getTasksElementItem) : "Lets to do nothing!"
    // const getTasksElementItem = useCallback((task: TaskType) => {
    //     return (
    //         <Task
    //             key={task.id}
    //             task={task}
    //             todoListId={todoListId}
    //             changeTaskTitle={props.changeTaskTitle}
    //             changeTaskStatus={props.changeTaskStatus}
    //             updatedTasks={props.updatedTasks}
    //         />
    //     )
    // }, [props.changeTaskStatus, props.todoListId, props.changeTaskTitle, props.updatedTasks])


    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todoListId), [props.removeTask, props.todoListId])
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(taskId, isDone, props.todoListId);
    }, [props.changeTaskStatus, props.todoListId])
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.todoListId);
    }, [props.changeTaskTitle, props.todoListId])


    const getOnClickHandlerCreator = useCallback((filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todoListId), [props.changeTodolistFilter, props.todoListId])
    const removeTodoList = useCallback(() => props.removeTodoList(props.todoListId), [props.removeTodoList, props.todoListId])
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.todoListId), [props.changeTodoListTitle, props.todoListId])


    return (
        <div>
            <div className={s.toDoListsParent}>

                <div className={s.titleOfTodoList}>
                    <Typography variant={"h5"} align={"center"}><EditableSpan title={props.title}
                                                                              changeTitle={changeTodoListTitle}/>
                        <IconButton onClick={removeTodoList} size={"small"}>
                            <DisabledByDefaultIcon/>
                        </IconButton>
                    </Typography>

                </div>
                <AddItemForm addItem={addTask}/>
                {
                    tasks.map(t => {
                        return <Task
                            key={t.id}
                            task={t}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}
                            updatedTasks={removeTask}
                        />
                    })
                }
                <List
                    sx={{width: '100%', maxWidth: 360}}
                    className={s.checked}>
                </List>
                <ButtonGroup
                    disableElevation

                    fullWidth
                    className={s.buttons}

                    size={"small"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={"contained"}>

                    <Button
                        sx={{mr: "10px", p: "2px", fontSize: "10px"}}
                        onClick={getOnClickHandlerCreator("all")}
                    >
                        All
                    </Button>

                    <Button
                        sx={{mr: "10px", p: "2px", fontSize: "10px"}}
                        onClick={getOnClickHandlerCreator("active")}
                    >
                        Active
                    </Button>

                    <Button
                        sx={{mr: "10px", p: "2px", fontSize: "10px"}}
                        onClick={getOnClickHandlerCreator("completed")}
                    >
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )

})

export default Todolist