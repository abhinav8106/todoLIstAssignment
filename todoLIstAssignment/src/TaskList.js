import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {toggleTaskStatus, deleteTask} from "./actions";
import {getSortedTasks, getFilteredTasks} from "./selectors";
import "./tasklist.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [sortBy, setSortBy] = useState("date"); // 'date' or 'status'
  const [filterBy, setFilterBy] = useState("all"); // 'all', 'pending', or 'completed'

  const handleToggleStatus = (id) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  // Get sorted and filtered tasks
  const sortedTasks = getSortedTasks(tasks, sortBy);
  const filteredTasks = getFilteredTasks(sortedTasks, filterBy);

  const renderTasks = filteredTasks.map((task) => (
    <div key={task.id} className="task-container">
      <h3
        className="task-header"
        style={{color: task.status === "completed" ? "green" : "red"}}
      >
        {task.title}
      </h3>
      <p>{task.description}</p>
      <p className={`task-status ${task.status}`}>Status: {task.status}</p>
      <p>Created on: {task.createdAt.toLocaleString()}</p>
      <button onClick={() => handleToggleStatus(task.id)}>Toggle Status</button>
      <button onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
    </div>
  ));

  return (
    <div>
      <h2>Task List</h2>
      <div className="sort-filter-container">
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="status">Status</option>
          </select>
        </label>
        <label>
          Filter By:
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      {renderTasks}
    </div>
  );
};

export default TaskList;
