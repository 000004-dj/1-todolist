import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../../App";
import s from "./ToDoList.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    updatedTasks: (TaskId: string, todoListId: string) => void
    changeTodolistFilter: (changeTodolistFilter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, checked: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    todoListId: string
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}

function Todolist(props: TodolistPropsType) {
    const addNewTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const haveTasks = () => props.tasks.length ? props.tasks.map(getTasksElementItem) : "Lets to do nothing!"

    //mapped tasks with JSX
    const getTasksElementItem = (task: TaskType) => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.todoListId)
        }
        return (
            <ListItem
                sx={{p: "0px"}}
                key={task.id}>

                <Checkbox
                    // type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />

                <span
                    className={task.isDone ? "taskDone" : "task"}
                >
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                </span>
                {/*<button*/}
                {/*    onClick={() => {*/}
                {/*        props.updatedTasks(task.id, props.todoListId)*/}
                {/*    }}*/}
                {/*    className={s.buttonCross}*/}
                {/*>*/}
                {/*    X*/}
                {/*</button>*/}
                <IconButton
                    color={"error"}
                    sx={{p: "0px"}}
                    size={"small"}
                    onClick={() => {
                        props.updatedTasks(task.id, props.todoListId)
                    }}
                >
                    <DeleteForeverIcon/>
                </IconButton>

            </ListItem>
        )
    }


    const getOnClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)

    return (

        <div className="Appp">
            <div className={s.toDoListsParent}>

                <div className={s.titleOfTodoList}>
                    <Typography variant={"h5"} align={"center"}><EditableSpan title={props.title}
                                                                              changeTitle={changeTodoListTitle}/>
                        <IconButton onClick={removeTodoList} size={"small"}>
                            <DisabledByDefaultIcon/>
                        </IconButton>
                    </Typography>
                    {/*<button onClick={removeTodoList}>x</button>*/}

                </div>
                <AddItemForm addItem={addNewTask}/>

                <List
                    sx={{width: '100%', maxWidth: 360}}
                    className={s.checked}>

                    {haveTasks()}
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
                        // className={props.filter === "all" ? "btn-active" : s.buttonAll}
                    >
                        All
                    </Button>

                    <Button
                        sx={{mr: "10px", p: "2px", fontSize: "10px"}}
                        onClick={getOnClickHandlerCreator("active")}
                        // className={props.filter === "active" ? "btn-active" : s.buttonActive}
                    >
                        Active
                    </Button>

                    <Button
                        sx={{mr: "10px", p: "2px", fontSize: "10px"}}
                        onClick={getOnClickHandlerCreator("completed")}
                        // className={props.filter === "completed" ? "btn-active" : s.buttonCompleted}
                    >
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )

}

export default Todolist