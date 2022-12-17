import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../App";
import s from "./ToDoList.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}

function Todolist(props: TodolistPropsType) {

    const addNewTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const haveTasks = () => props.tasks.length ? props.tasks.map(getTasksElementItem) : "Lets to do nothing!"
    const getTasksElementItem = (task: TaskType) => {
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.todoListId)
        }
        return (
            <li key={task.id}>

                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />

                <span
                    className={task.isDone ? "taskDone" : "task"}>
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
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


    const getOnClickHandlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)

    return (
        <div className="App">
            <div className={s.toDoListsParent}>

                <div className={s.titleOfTodoList}>
                    <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/></h3>
                    <button onClick={removeTodoList}>x</button>
                </div>
                <AddItemForm addItem={addNewTask}/>

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