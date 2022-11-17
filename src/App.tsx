import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist'
import {constants} from "fs";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}
export type filterValuesType = "all" | "active" | "completed"

function App() {
    const todolistTitle: string = 'What to learn';
    // const todolistTitle_2: string = 'What to buy';

    // const tasks: Array<TaskType> = [
    //
    // ]

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {
            id: 1,
            title: "HTML&CSS",
            isDone: true,
        },
        {
            id: 2,
            title: "Js",
            isDone: true,
        },
        {
            id: 3,
            title: "React",
            isDone: false,
        },
    ])

    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updatedTasks)
    }
    const [filter, setFilter] = useState<filterValuesType>("all")
    console.log(filter)

    // const tasks_2: Array<TaskType> = [
    //     {
    //         id: 4,
    //         title: "Bread",
    //         isDone: true,
    //     },
    //     {
    //         id: 5,
    //         title: "Coca-cola",
    //         isDone: true,
    //     },
    //     {
    //         id: 6,
    //         title: "Snikers",
    //         isDone: false,
    //     },
    // ]

    const changeTodolistFilter = (nextFilterValue: filterValuesType) => {
        setFilter(nextFilterValue)
    }

    let tasksForRender: Array<TaskType> = [];
    if (filter === "all") {
        tasksForRender = tasks
    } else if (
        filter === "active"
    ) {
        tasksForRender = tasks.filter(task => task.isDone === false)
    } else if (filter === "completed") {
        tasksForRender = tasks.filter(task => task.isDone === true)
    }

    return (
        <div className='App'>
            <Todolist title={todolistTitle} tasks={tasksForRender} updatedTasks={removeTask}
                      changeTodolistFilter={changeTodolistFilter}/>
            {/*<Todolist title={todolistTitle_2} tasks={tasks_2}/>*/}
        </div>
    )
}


export default App
