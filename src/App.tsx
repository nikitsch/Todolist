import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskType, Todolist } from './Todolist';

function App() {

  let tasks1: Array<TaskType> = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "TypeScript", isDone: true },
  ]

  let tasks2: Array<TaskType> = [
    { id: 1, title: "Once upon a time in HollyWood", isDone: true },
    { id: 2, title: "Man in Black", isDone: true },
    { id: 3, title: "John Wick", isDone: false },
  ]

  return (
    <div className="App">
      <Todolist title="Learn" tasks={tasks1} />
      <Todolist title="Movies" tasks={tasks2} />
    </div>
  );
}

export default App;
