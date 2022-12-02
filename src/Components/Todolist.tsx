import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "../App";
import s from "./ToDoList.module.css"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    updatedTasks: (TaskId: string) => void
    changeTodolistFilter: (changeTodolistFilter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, checked: boolean) => void
    filter: FilterValuesType

}

function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


    const getTasksElementItem = (task: TaskType) => {

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

        return (
            <li key={task.id}>

                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />

                <span
                    className={task.isDone ? "taskDone" : "task"}>
                    {task.title}
                </span>

                <button
                    onClick={() => {
                        props.updatedTasks(task.id)
                    }}
                    className={s.buttonCross}

                >
                    X
                </button>

            </li>
        )
    }


    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            setError(true)
        }

        setTitle("")
    }

    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const getSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const getOnClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter)

    const haveTasks = () => props.tasks.length ? props.tasks.map(getTasksElementItem) : "Lets to do nothing!"

    const errorClassForInput = (err: boolean) => !err ? "s.inputNoErr" : "input-error"


    return (
        <div className="App">
            <div className={s.toDoListsParent}>
                <h3>{props.title}</h3>
                <div className={s.inputWithButton}>

                    <input
                        value={title}
                        onKeyDown={onEnterAddTask}
                        onChange={getSetTitle}
                        className={errorClassForInput(error)}/>

                    <button
                        onClick={addTask}
                        className={s.buttonPlus}>
                        +
                    </button>
                    {error && <div style={{color: "red"}}>Your data not like in form</div>}

                </div>
                <ul className={s.checked}>
                    {haveTasks()}
                </ul>
                <div className={s.buttons}>
                    <button
                        onClick={getOnClickHandlerCreator("all")}
                        className={props.filter === "all" ? "btn-active" : s.buttonAll}>
                        All
                    </button>

                    <button
                        onClick={getOnClickHandlerCreator("active")}
                        className={props.filter === "active" ? "btn-active" : s.buttonActive}>
                        Active
                    </button>

                    <button
                        onClick={getOnClickHandlerCreator("completed")}
                        className={props.filter === "completed" ? "btn-active" : s.buttonCompleted}>
                        Completed
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Todolist