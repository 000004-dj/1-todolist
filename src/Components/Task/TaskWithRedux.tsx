import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, {ChangeEvent, memo} from "react";
import {TaskType} from "../../AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}


export const TaskWithRedux = memo(({
                                       task,
                                       todoListId,
                                   }: TaskPropsType) => {

    let {id, isDone, title} = {...task}

    const dispatch = useDispatch()


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(id, e.currentTarget.checked, todoListId))
    const onTitleChangeHandler = (title: string) => dispatch(changeTaskTitleAC(id, title, todoListId))
    const updatedTasks = (id: string) => dispatch(removeTaskAC(id, todoListId))

    return (
        <ListItem
            sx={{p: "0px"}}
        >

            <Checkbox
                // type="checkbox"
                checked={isDone}
                onChange={onChangeHandler}
            />

            <span
                className={isDone ? "taskDone" : "task"}
            >
                    <EditableSpan title={title} changeTitle={onTitleChangeHandler}/>
                </span>
            <IconButton
                color={"error"}
                sx={{p: "0px"}}
                size={"small"}
                onClick={() => {
                    updatedTasks(id)
                }}
            >
                <DeleteForeverIcon/>
            </IconButton>

        </ListItem>
    )
})