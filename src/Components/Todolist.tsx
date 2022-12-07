import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType, TodoListType} from "../App";
import s from "./ToDoList.module.css"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    updatedTasks: (TaskId: string, todoListId: string) => void
    changeTodolistFilter: (changeTodolistFilter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, checked: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    todoListId: string
}

function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


    const getTasksElementItem = (task: TaskType) => {

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

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
                        props.updatedTasks(task.id, props.todoListId)
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
            props.addTask(trimmedTitle, props.todoListId)
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

    const getOnClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const haveTasks = () => props.tasks.length ? props.tasks.map(getTasksElementItem) : "Lets to do nothing!"

    const errorClassForInput = (err: boolean) => !err ? "s.inputNoErr" : "input-error"


    return (
        <div className="App">
            <div className={s.toDoListsParent}>

                <div className={s.titleOfTodoList}>
                    <h3>{props.title}</h3>
                    <button onClick={removeTodoList}>x</button>
                </div>
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