import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

//rsc react stateless component

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (props) => {

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const [title, setTitle] = useState<string>("")

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }


    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)  // e.currentTarget === input

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
                <button onClick={() => {
                    props.changeTodoListFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;