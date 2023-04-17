import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

  // let initTasks1: Array<TaskType> = [
  //   { id: 1, title: "HTML&CSS", isDone: true },
  //   { id: 2, title: "JS", isDone: true },
  //   { id: 3, title: "TypeScript", isDone: true },
  // ]

  // let tasks2: Array<TaskType> = [
  //   { id: 1, title: "Once upon a time in HollyWood", isDone: true },
  //   { id: 2, title: "Man in Black", isDone: true },
  //   { id: 3, title: "John Wick", isDone: false },
  // ]

  let [tasks, setTasks] = useState([
    { id: v1(), title: "Once upon a time in HollyWood", isDone: true },
    { id: v1(), title: "Man in Black", isDone: true },
    { id: v1(), title: "John Wick", isDone: false },
  ])

  let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) task.isDone = isDone
    setTasks([...tasks])
  }

  let tasksForTodolist = tasks
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone)
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone)
  }

  return (
    <div className="App">
      <Todolist title="Learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus} />
      {/* <Todolist title="Movies" tasks={tasks2} /> */}
    </div>
  );
}

export function activeTask() {

}

export default App;
