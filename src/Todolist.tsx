import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChangeHandle = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };
  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <h3>What to learn</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandle}
          onKeyPress={onKeyPressHandler} />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(task => {
            const onRemoveHandler = () => props.removeTask(task.id);
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked);

            return <li key={task.id}>
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
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}