import React, {memo, useCallback} from "react";
import {FilterValuesType, TaskType} from "../../App";
import s from "./ToDoList.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {ButtonGroup, IconButton, List, Typography} from "@mui/material";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import {ButtonWithMemo} from "../optimizatedButton/ButtonWithMemo"
import {TaskWithRedux} from "../Task/TaskWithRedux";
import {useDispatch} from "react-redux";
import {ChangeTodoListTitleAC, RemoveTodoListAC} from "../../redux/todolist-reducer";
import {addTaskAC} from "../../redux/tasks-reducer";

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
    const dispatch = useDispatch()

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

    const getOnClickHandlerCreator = useCallback((filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todoListId), [props.changeTodolistFilter, props.todoListId])

    const removeTodoList = () => dispatch(RemoveTodoListAC(props.todoListId))
    const changeTodoListTitle = (title: string) => dispatch(ChangeTodoListTitleAC(title, props.todoListId))
    const addTask = (title: string) => dispatch(addTaskAC(title, props.todoListId))
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
                        return <TaskWithRedux
                            key={t.id}
                            task={t}
                            todoListId={props.todoListId}
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

                    size={"large"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={"contained"}>

                    <ButtonWithMemo
                        title={"All"}
                        color={"info"}
                        filterValue={"all"}
                        getOnClickHandlerCreator={getOnClickHandlerCreator}
                        variant={props.filter === "all" ? "outlined" : "text"}
                    />
                    <ButtonWithMemo
                        title={"ACTIVE"}
                        color={"info"}
                        filterValue={"active"}
                        getOnClickHandlerCreator={getOnClickHandlerCreator}
                        variant={props.filter === "active" ? "outlined" : "text"}
                    />
                    <ButtonWithMemo
                        title={"COMPLETED"}
                        color={"info"}
                        filterValue={"completed"}
                        getOnClickHandlerCreator={getOnClickHandlerCreator}
                        variant={props.filter === "completed" ? "outlined" : "text"}
                    />

                </ButtonGroup>
            </div>
        </div>
    )

})

export default Todolist


