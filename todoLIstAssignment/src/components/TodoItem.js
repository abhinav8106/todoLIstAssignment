import {motion} from "framer-motion";
import React, {useRef, useState} from "react";
import {AiFillEdit} from "react-icons/ai";
import {IoCheckmarkDoneSharp, IoClose} from "react-icons/io5";

const TodoItem = (props) => {
  const {item, updateTodo, removeTodo, completeTodo} = props;

  const [isEdit, setIsEdit] = useState(false);

  const inputRef = useRef(true);
  const inputDescriptionRef = useRef(true);

  const changeFocus = () => {
    setIsEdit(true);
  };

  const update = (e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({
        id: item.id,
        item: inputRef.current.value,
        description: inputDescriptionRef.current.value,
      });
      setIsEdit(false);
    }
  };
  return (
    <motion.li
      initial={{x: "150vw", transition: {type: "spring", duration: 2}}}
      animate={{x: 0, transition: {type: "spring", duration: 2}}}
      whileHover={{
        scale: 0.9,
        transition: {type: "spring", duration: 0.1},
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: {duration: 0.5},
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
    >
      {isEdit ? (
        <>
          <textarea
            ref={inputRef}
            defaultValue={item.item}
            onKeyPress={update}
          />
          <hr />
          <textarea
            ref={inputDescriptionRef}
            defaultValue={item.description}
            onKeyPress={update}
          />
        </>
      ) : (
        <>
          <h5>{new Date(item.time).toLocaleDateString()}</h5>
          <h2>{item.item}</h2>
          <h4>{item.description}</h4>
        </>
      )}

      <div className="btns">
        <motion.button
          whileHover={{scale: 1.4}}
          whileTap={{scale: 0.9}}
          onClick={() => changeFocus()}
        >
          {" "}
          <AiFillEdit />{" "}
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{scale: 1.4}}
            whileTap={{scale: 0.9}}
            style={{color: "green"}}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{scale: 1.4}}
          whileTap={{scale: 0.9}}
          style={{color: "red"}}
          onClick={() => removeTodo(item.id)}
        >
          {" "}
          <IoClose />
        </motion.button>{" "}
      </div>
      {item.completed && <span className="completed">done</span>}
    </motion.li>
  );
};

export default TodoItem;
