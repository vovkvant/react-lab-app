import React, { useEffect, useRef } from 'react';

function InputForm({ todoItems, editIndex, updateList }) {

  const inputTodo = useRef(null);

  useEffect(() => {
    if (editIndex !== -1) {
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
    updateList(listCopy)
    inputTodo.current.value = ""
  };

  return (
    <div className="row">
      <div className="col-6">
        <h2>TODO list application</h2>
        <form className="row g-3" onSubmit={saveTodo}>
          <div className="col-auto">
            <input ref={inputTodo} type="text" className="form-control" placeholder="input todo" />
          </div>
          <div className="col-auto">
            <button onClick={saveTodo} className="btn btn-primary mb-3" type="button">
              {editIndex === -1 ? "Add" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputForm;