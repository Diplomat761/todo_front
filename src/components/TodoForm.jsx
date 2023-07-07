import React, { useState, useRef } from "react";
import axios from "axios";

function TodoForm(props) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      data: input,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/todos/",
        todo
      );
      props.onSubmit(response.data);
    } catch (error) {
      console.error(error);
    }

    setInput("");
  };

  return (
    <form className="todo_form">
      <input
        placeholder="Напиши, чтоб не забыть"
        value={input}
        onChange={handleChange}
        name="text"
        className="input-add"
        ref={inputRef}
      />
      <button onClick={handleSubmit} className="add-button">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
