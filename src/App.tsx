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

  // let [tasks, setTasks] = useState([
  //   { id: v1(), title: "Once upon a time in HollyWood", isDone: true },
  //   { id: v1(), title: "Man in Black", isDone: true },
  //   { id: v1(), title: "John Wick", isDone: false },
  // ])

  // let [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(el => el.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj });
  }


  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(t => t.id === todolistId)
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "What to see", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" }
  ]);

  let removeList = (todolistId: string) => {
    let filteredTodolist = todolists.filter(el => el.id !== todolistId)
    setTodolists(filteredTodolist)
    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "Once upon a time in HollyWood", isDone: true },
      { id: v1(), title: "Man in Black", isDone: true },
      { id: v1(), title: "John Wick", isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: "fruits", isDone: false },
      { id: v1(), title: "potatos", isDone: true },
      { id: v1(), title: "orange juice", isDone: false },
      { id: v1(), title: "cheese", isDone: true }
    ]
  })

  return (
    <div className="App">
      {
        todolists.map((tl) => {

          let tasksForTodolist = tasksObj[tl.id];


          let countActiveTasks = tasksForTodolist.filter(t => !t.isDone);
          

          if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
          }
          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
          }

          return <Todolist key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeList={removeList}
            countActiveTasks={countActiveTasks.length} />
        })
      }
    </div>
  );
}

export function activeTask() {

}

export default App;
