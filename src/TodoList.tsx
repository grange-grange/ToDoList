import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

//rsc react stateless component

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

        return (
            <li>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}
                />
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        } else {
            setError(true)
        }
        setTitle("")
    }


    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }  // e.currentTarget === input

    const recommendedTaskTitleLength = 10
    const maxTaskTitleLength = 20
    const addTaskIsNotPossible: boolean = !title.length || title.length > maxTaskTitleLength
    const onKeyDownAddTaskHandler = addTaskIsNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()
    const longTaskTitleWarningMessage =
        title.length > recommendedTaskTitleLength && title.length <= maxTaskTitleLength
        && <div style={{color: "hotpink"}}>Title should be shorter</div>

    const longTaskTitleErrorMessage =
        title.length > 20
        && <div style={{color: "red"}}>Title is too long!</div>

    return (
        <div className={"todolist"}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"Enter task title"}
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
                <button
                    disabled={addTaskIsNotPossible}
                    onClick={addTaskHandler}
                >+
                </button>
                {longTaskTitleWarningMessage}
                {longTaskTitleErrorMessage}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button className={props.filter === "all" ? "btn-active" : ""} onClick={() => {
                    props.changeTodoListFilter("all")
                }}>All
                </button>
                <button className={props.filter === "active" ? "btn-active" : ""} onClick={() => {
                    props.changeTodoListFilter("active")
                }}>Active
                </button>
                <button className={props.filter === "completed" ? "btn-active" : ""} onClick={() => {
                    props.changeTodoListFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;