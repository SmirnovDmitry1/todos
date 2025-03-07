import React from "react";

import "./TodoItem.css";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <div className="todo-item">
      <div
        className={`custom-checkbox ${todo.completed ? "checked" : ""}`}
        onClick={() => toggleTodo(todo.id)}
        role="checkbox"
      ></div>
      <span className={todo.completed ? "completed-task" : ""}>
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
