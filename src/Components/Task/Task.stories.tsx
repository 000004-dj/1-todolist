import React, {ChangeEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {TaskWithRedux} from './TaskWithRedux';
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLIST/Task',
    component: TaskWithRedux,
} as ComponentMeta<typeof TaskWithRedux>;


const Template: ComponentStory<typeof TaskWithRedux> = (args) => {
    const [task, setTask] = useState({id: "sdvsdvs1231", isDone: true, title: "JS"})
    const changeTaskTitleHandler = (title: string) => {
        setTask({...task, title: title})
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task,
            isDone: e.currentTarget.checked
        })
    }


    return <ListItem
        sx={{p: "0px"}}
    >

        <Checkbox
            checked={task.isDone}
            onChange={changeTaskStatusHandler}
        />

        <span
            className={task.isDone ? "taskDone" : "task"}
        >
                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                </span>
        <IconButton
            color={"error"}
            sx={{p: "0px"}}
            size={"small"}
            onClick={action("Task was removed")}
        >
            <DeleteForeverIcon/>
        </IconButton>

    </ListItem>
}

export const TaskDefault = Template.bind({})


