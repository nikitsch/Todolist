import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function App() {

  let [tasks, setTasks] = useState([
    { id: v1(), title: "Once upon a time in HollyWood", isDone: true },
    { id: v1(), title: "Man in Black", isDone: true },
    { id: v1(), title: "John Wick", isDone: false },
  ])

  // let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks);
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

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(t => t.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: v1(), title: "What to see", filter: "active" },
    { id: v1(), title: "What to buy", filter: "completed" }
  ]);

  return (
    <div className="App">
      {
        todolists.map((tl) => {

          let tasksForTodolist = tasks;

          if (tl.filter === "completed") {
            tasksForTodolist = tasks.filter(t => t.isDone)
          }
          if (tl.filter === "active") {
            tasksForTodolist = tasks.filter(t => !t.isDone)
          }

          return <Todolist key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter} />
        })
      }
    </div>
  );
}

export function activeTask() {

}

export default App;
