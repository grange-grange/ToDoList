import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App(): JSX.Element {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: Array<TaskType> = []
    if (filter === "all") {
        tasksForRender = tasks
    }
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone !== true)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone !== false)
    }
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
