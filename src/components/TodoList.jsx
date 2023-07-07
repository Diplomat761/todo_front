import React from "react";

import { MdDelete } from "react-icons/md";

function TodoList({ todos, removeTodo, completeTodo }) {
  return (
    <>
      {todos.map((todo) => (
        <div
          className={todo.isComplete ? "todo-complete" : "todo-container"}
          key={todo.id}
        >
          <div onClick={() => completeTodo(todo.id)}>{todo.data}</div>
          <div className="icons">
            <MdDelete
              onClick={() => removeTodo(todo.id)}
              className="delete-icon"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default TodoList;
