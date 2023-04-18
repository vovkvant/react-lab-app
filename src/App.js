import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';
import DataSource from "./DataSource";

function App() {
  const dataSource = new DataSource();

  const [todoItems, setTodoItems] = useState([]);
  const [count, setCount] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);

  const inputTodo = useRef(null);

  useEffect(() => {
    console.log("useEffect " + editIndex)
    const jsonData = dataSource.getData()
    if (jsonData != null) {
      const items = JSON.parse(jsonData)
      setCount(items.length)
      setTodoItems(items)
    }
    if(editIndex !== -1) {
      inputTodo.current.value = todoItems[editIndex].todoText
    }
  }, [editIndex]);

  const saveTodo = () => {
    const todoToAdd = inputTodo.current.value.trim()
    const listCopy = [...todoItems];
    if (todoToAdd.length > 0) {
      if (editIndex === -1) {
        listCopy.push({ todoText: todoToAdd, todoTime: new Date().toLocaleString() }) 
      } else {
        listCopy[editIndex] = { todoText: todoToAdd, todoTime: new Date().toLocaleString() };
      }
    }
    setEditIndex(-1)
    updateList(listCopy)
    inputTodo.current.value = ""
  };

  const removeTodo = (index) => {
    if (window.confirm("Are you sure you want to remove it?")) {
      const listCopy = [...todoItems];
      listCopy.splice(index, 1);
      updateList(listCopy)
    }
  }

  const updateList = (editedList) => {
    setTodoItems(editedList);
    dataSource.putData(editedList)
    setCount(editedList.length)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>TODO list application</h2>
          <form className="row g-3" onSubmit={saveTodo}>
            <div className="col-auto">
              <input ref={inputTodo} type="text" className="form-control" placeholder="input todo" />
            </div>
            <div className="col-auto">
              <button onClick={saveTodo} className="btn btn-primary mb-3" type="button">
                { editIndex === -1 ? "Add" : "Save" }
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div>Number of TODOs: {count}</div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col" style={{ width: "40px" }}>#</th>
                <th scope="col">TODO</th>
                <th scope="col" style={{ width: "130px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {todoItems.map((item, index) => ( 
                <tr key={index}>
                  <th scope="row" >{index + 1}</th>
                  <td>{item.todoText}&nbsp;<span style={{ "fontSize": "8px" }} >{item.todoTime}</span>
                  </td>
                  <td>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setEditIndex(index)}>Edit</button>&nbsp;
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeTodo(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
