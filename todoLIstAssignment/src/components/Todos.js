import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addTodos} from "../redux/reducer";
import {GoPlus} from "react-icons/go";
import {motion} from "framer-motion";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setTodoDescription(e.target.value);
  };

  const add = () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      dispatch(
        addTodos({
          id: Math.floor(Math.random() * 1000),
          item: todo,
          description: todoDescription,
          completed: false,
          time: Date.now(),
        })
      );
      setTodo("");
      setTodoDescription("");
    }
  };
  //console.log("props from store", props);
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
        placeholder="Task"
      />
      <input
        type="text"
        onChange={(e) => handleDescriptionChange(e)}
        className="todo-input todo-input-description"
        value={todoDescription}
        placeholder="Task Description"
      />
      <motion.button
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        className="add-btn"
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};
export default Todos;
