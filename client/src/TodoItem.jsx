import React, { useState } from "react";

const API_BASE = "https://mern-todo-a.onrender.com/todo";

const TodoItem = (props) => {
  const { task, id, setItems, updateTodo } = props;
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(task);

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(API_BASE + "/delete/" + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete a task");
      }
      const data = await response.json();
      setItems((items) => items.filter((item) => item._id !== data._id));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (editedName.trim() !== "") {
      await updateTodo(id, { task: editedName });
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedName(task);
    setEditing(false);
  };

  return (
    <div className="todo">
      {editing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <div className="text">{task}</div>
          <div className="delete-update">
            <div className="update-todo" onClick={handleEdit}>
              <span>🖊️</span>
            </div>
            <div className="delete-todo" onClick={() => deleteTodo(id)}>
              <span>🗑️</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
