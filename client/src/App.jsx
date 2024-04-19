import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import "./index.css";
const API_BASE = "http://localhost:5000/todo";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const GetTodos = () => {
    fetch(API_BASE)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  };
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(API_BASE + "/update/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error("Failed to update a task");
      }
      await GetTodos();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  useEffect(() => {
    GetTodos();
  }, []);

  const addItem = async () => {
    const data = await fetch(API_BASE + "/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        task: input,
      }),
    }).then((res) => res.json());
    await GetTodos();
    setInput("");
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>My To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" value={input} onChange={handleChange}></input>
        <button onClick={() => addItem()}>ADD</button>
      </div>
      <div className="todolist">
        {items.map((item) => {
          const { _id, task } = item;
          return (
            <TodoItem
              task={task}
              id={_id}
              setItems={setItems}
              updateTodo={updateTodo}
            />
          );
        })}
      </div>
    </div>
  );
}
export default App;
