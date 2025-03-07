import React, { useEffect, useState } from "react";

import { TodoList, AddTodo, Tabs } from "./components";

import "./App.css";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export type Tab = "all" | "completed" | "incomplete";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("all");

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return todo.completed;
    return !todo.completed;
  });

  return (
    <div className="App">
      <h1>todos</h1>
      <AddTodo addTodo={addTodo} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
