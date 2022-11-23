import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    updatedTasks: (TaskId: string) => void
    changeTodolistFilter: (changeTodolistFilter: FilterValuesType) => void
    addTask: (title: string) => void
}

function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>("")

    const getTasksElementItem = (task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => {
                    props.updatedTasks(task.id)
                }}>
                    X
                </button>
            </li>
        )
    }


    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }

    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const getSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const getOnClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter)


    return (
        <div className='App'>
            <div><h3>{props.title}</h3>
                <div>

                    <input value={title} onKeyDown={onEnterAddTask} onChange={getSetTitle}/>

                    <button onClick={addTask}> +</button>

                </div>
                <ul>
                    {props.tasks.map(getTasksElementItem)}
                </ul>
                <div>
                    <button onClick={getOnClickHandlerCreator("all")}>All
                    </button>
                    <button onClick={getOnClickHandlerCreator("active")}>Active
                    </button>
                    <button onClick={getOnClickHandlerCreator("completed")}>Completed
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Todolist