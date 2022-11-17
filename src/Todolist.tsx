import React from "react";
import {filterValuesType, TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    updatedTasks: (TaskId: number) => void
    changeTodolistFilter: (changeTodolistFilter: filterValuesType) => void
}

function Todolist(props: TodolistPropsType) {
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
    // const tasksListElement = props.tasks.map(getTasksElementItem)


    return (
        <div className='App'>
            <div><h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map(getTasksElementItem)}
                </ul>
                <div>
                    <button onClick={() => {
                        props.changeTodolistFilter("all")
                    }}>All
                    </button>
                    <button onClick={() => {
                        props.changeTodolistFilter("active")
                    }}>Active
                    </button>
                    <button onClick={() => {
                        props.changeTodolistFilter("completed")
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Todolist