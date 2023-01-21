import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskType} from "../../AppWithRedux";

type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
    updatedTasks: (taskId: string) => void
}


// export const Task = memo(({
//                               task,
//                               changeTaskStatus,
//                               changeTaskTitle,
//                               updatedTasks
//                           }: TaskPropsType) => {
//
//     let {id, isDone, title} = {...task}
//
//
//     const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked), [changeTaskStatus, task.id])
//     const onTitleChangeHandler = useCallback((title: string) => changeTaskTitle(id, title), [changeTaskTitle, id])
//
//
//     return (
//         <ListItem
//             sx={{p: "0px"}}
//         >
//
//             <Checkbox
//                 // type="checkbox"
//                 checked={isDone}
//                 onChange={onChangeHandler}
//             />
//
//             <span
//                 className={isDone ? "taskDone" : "task"}
//             >
//                     <EditableSpan title={title} changeTitle={onTitleChangeHandler}/>
//                 </span>
//             <IconButton
//                 color={"error"}
//                 sx={{p: "0px"}}
//                 size={"small"}
//                 onClick={() => {
//                     updatedTasks(id)
//                 }}
//             >
//                 <DeleteForeverIcon/>
//             </IconButton>
//
//         </ListItem>
//     )
// })