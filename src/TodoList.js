function TodoList({ todoItems, setEditIndex, updateList }) {

    const removeTodo = (index) => {
        if (window.confirm("Are you sure you want to remove it?")) {
            const listCopy = [...todoItems];
            listCopy.splice(index, 1);
            updateList(listCopy)
        }
    }

    return (
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
    )
}

export default TodoList;