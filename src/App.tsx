import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist'
// import {constants} from "fs";
import {v1} from "uuid"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todolistTitle: string = 'What to learn';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {
            id: v1(),
            title: "HTML&CSS",
            isDone: true,
        },
        {
            id: v1(),
            title: "Js",
            isDone: true,
        },
        {
            id: v1(),
            title: "React",
            isDone: false,
        },
    ])

    const removeTask = (taskId: string) => setTasks(tasks.filter(task => task.id !== taskId))

    const addTask = (title: string) => setTasks([{id: v1(), title, isDone: false}, ...tasks])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodolistFilter = (nextFilterValue: FilterValuesType) => setFilter(nextFilterValue)

    const getFilteredTasks = (task: Array<TaskType>, filter: FilterValuesType) => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default :
                return tasks
        }

    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    return (
        <div className='App'>
            <Todolist title={todolistTitle} tasks={filteredTasks} updatedTasks={removeTask}
                      changeTodolistFilter={changeTodolistFilter} addTask={addTask}/>
            {/*<Todolist title={todolistTitle_2} tasks={tasks_2}/>*/}
        </div>
    )
}


export default App
