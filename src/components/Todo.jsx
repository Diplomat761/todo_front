import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todos/");
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sortAlphabetically = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/sort-alphabetically"
      );
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/todos/",
        todo
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}`);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const completeTodo = async (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      }
      return todo;
    });

    try {
      await axios.put(`http://127.0.0.1:8000/api/todos/${id}`, {
        isComplete: updatedTodos.find((todo) => todo.id === id).isComplete,
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="header">Какие у тебя планы на сегодня?</h1>
      <button onClick={sortAlphabetically} className="sort-button">
        Сортировать по алфавиту
      </button>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
      />
    </div>
  );
}

export default Todo;
