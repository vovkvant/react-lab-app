import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [count, setCount] = useState(0);

  const inputTodo = useRef(null);

  useEffect(() => {
    const jsonData = localStorage.getItem('todoItems')
    if (jsonData != null) {
      const items = JSON.parse(jsonData)
      setCount(items.length)
      setTodoItems(items)
    }
  }, []);

  const addTodo = () => {
    const todoToAdd = inputTodo.current.value.trim()
    if (todoToAdd.length > 0) {
      const listCopy = [...todoItems, {todoText: todoToAdd, todoTime: new Date().toLocaleString()}];
      inputTodo.current.value = ""
      updateList(listCopy)
    }
  };

  const removeTodo = (index) => {
    if (window.confirm("Are you sure you want to remove it?")) {
      const listCopy = [...todoItems];
      listCopy.splice(index, 1);
      updateList(listCopy)
    }
  };

  const updateList = (editedList) => {
    setTodoItems(editedList);
    localStorage.setItem('todoItems', JSON.stringify(editedList));
    setCount(editedList.length)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>TODO list application</h2>
          <form className="row g-3" onSubmit={addTodo}>
            <div className="col-auto">
              <input ref={inputTodo} type="text" className="form-control" placeholder="input todo" />
            </div>
            <div className="col-auto">
              <button onClick={addTodo} className="btn btn-primary mb-3" type="button">Add</button>
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
                <th scope="col" style={{width:"40px"}}>#</th>
                <th scope="col">TODO</th>
                <th scope="col" style={{width:"90px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {todoItems.map((item, index) => (
                <tr key={index}>
                  <th scope="row" >{index+1}</th>
                  <td>{item.todoText}&nbsp;<span style={{"font-size":"8px"}} >{item.todoTime}</span>
                  </td>
                  <td><button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeTodo(index)}>Remove</button></td>
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
