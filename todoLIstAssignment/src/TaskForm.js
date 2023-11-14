import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addTask} from "./actions";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (title.trim() === "" || description.trim() === "") {
      // Implement form validation (optional)
      alert("Please fill out all fields");
      return;
    }

    dispatch(addTask(title, description));
    // Reset form fields
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h2>Add Task</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
