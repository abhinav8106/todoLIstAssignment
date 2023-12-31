import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {completeTodos, removeTodos, updateTodos} from "../redux/reducer";
import TodoItem from "./TodoItem";
import {AnimatePresence, motion} from "framer-motion";

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state);

  const renderToDo = (item) => {
    return (
      <TodoItem
        key={item.id}
        item={item}
        removeTodo={(data) => dispatch(removeTodos(data))}
        updateTodo={(data) => dispatch(updateTodos(data))}
        completeTodo={(data) => dispatch(completeTodos(data))}
      />
    );
  };

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {todos.length > 0 && sort === "active"
            ? todos.map((item) => {
                return item.completed === false && renderToDo(item);
              })
            : null}
          {todos.length > 0 && sort === "completed"
            ? todos.map((item) => {
                return item.completed === true && renderToDo(item);
              })
            : null}
          {/* for all items */}
          {todos.length > 0 && sort === "all"
            ? todos.map((item) => renderToDo(item))
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
