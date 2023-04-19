import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
  id: string
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle("");
    } else {
      setError("Title is required")
      setNewTaskTitle("");
    }
  };
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandle}
          onKeyPress={onKeyPressHandler}
          className={error ? "error" : ""} />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(task => {
            const onRemoveHandler = () => props.removeTask(task.id, props.id);
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);

            return <li className={task.isDone ? "is-done" : ""}
              key={task.id}>
              <input type="checkbox"
                onChange={onChangeHandler}
                checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          })
        }
      </ul>
      <div>
        <button className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}>All</button>
        <button className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}