import React, {useState} from 'react';
import './App.css';
import Todolist from './Components/Todolist'
import {v1} from "uuid"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    // tasks: Array<TaskType>
}
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {

    const id_1 = v1();
    const id_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: id_1, title: "What to learn", filter: "all"},
        {id: id_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [id_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true,},
            {id: v1(), title: "Js", isDone: true,},
            {id: v1(), title: "React", isDone: false,}
        ],
        [id_2]: [
            {id: v1(), title: "Milk", isDone: true,},
            {id: v1(), title: "Meat", isDone: true,},
            {id: v1(), title: "Wheat", isDone: false,}
        ]
    })


    const removeTask = (taskId: string, todoListId: string) => setTasks({
        ...tasks,
        [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)
    })


    const addTask = (title: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]
        })
    }

    const changeTaskStatus = (taskId: any, isDone: boolean, todoListId: string) =>
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }


    const changeTodolistFilter = (nextFilterValue: FilterValuesType, todoListId: string) => setTodoLists(
        todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl)
    )


    const getFilteredTasks = (task: Array<TaskType>, filter: FilterValuesType) => {
        switch (filter) {
            case "completed":
                return task.filter(task => task.isDone)
            case "active":
                return task.filter(task => !task.isDone)
            default :
                return task
        }

    }


    const todoListsComponents = todoLists.map((tl) => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Todolist
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}

                updatedTasks={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })


    return (
        <div className='App'>
            {todoListsComponents}
        </div>
    )
}


export default App
