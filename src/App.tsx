import React from 'react';
import './App.css';
import Todolist from './Todolist'

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

function App() {
    const todolistTitle_1: string = 'What to learn';
    const todolistTitle_2: string = 'What to buy';

    const tasks_1: Array<TaskType> = [
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
    ]

    const tasks_2: Array<TaskType> = [
        {
            id: 4,
            title: "Bread",
            isDone: true,
        },
        {
            id: 5,
            title: "Coca-cola",
            isDone: true,
        },
        {
            id: 6,
            title: "Snikers",
            isDone: false,
        },
    ]


    return (
        <div className='App'>
            <Todolist title={todolistTitle_1} tasks={tasks_1}/>
            <Todolist title={todolistTitle_2} tasks={tasks_2}/>
        </div>
    )
}


export default App
