import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import DataSource from "./DataSource";
import InputForm from "./InputForm";
import TodoList from "./TodoList";

function App() {
  const dataSource = new DataSource();

  const [todoItems, setTodoItems] = useState([]);
  const [count, setCount] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    dataSource.getData().then(jsonData => {
      if (jsonData != null) {
        const items = JSON.parse(jsonData)
        setCount(items.length)
        setTodoItems(items)
      }
    })
  }, []);

  const updateList = (editedList) => {
    setEditIndex(-1)
    setCount(editedList.length)
    dataSource.putData(editedList).then(() => {
      setTodoItems(editedList)
    })
  }

  return (
    <div className="container">
      <InputForm todoItems={todoItems} editIndex={editIndex} updateList={updateList} />
      <div className="row">
        <div className="col-6">
          <div>Number of TODOs: {count}</div>
          <TodoList todoItems={todoItems} setEditIndex={setEditIndex} updateList={updateList} />
        </div>
      </div>
    </div>
  );
}

export default App;
