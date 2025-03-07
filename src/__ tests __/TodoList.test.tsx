import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TodoList } from "../components";
import { Todo } from "../App";

describe("TodoList Component", () => {
  const toggleTodoMock = jest.fn();
  const deleteTodoMock = jest.fn();

  const todos: Todo[] = [
    { id: 1, text: "Task 1", completed: false },
    { id: 2, text: "Task 2", completed: true },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Проверка отображения списка задач", () => {
    render(
      <TodoList
        todos={todos}
        toggleTodo={toggleTodoMock}
        deleteTodo={deleteTodoMock}
      />
    );

    const task1 = screen.getByText("Task 1");
    const task2 = screen.getByText("Task 2");
    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();
  });

  test("Проверка передачи правильных пропсов в TodoItem", () => {
    render(
      <TodoList
        todos={todos}
        toggleTodo={toggleTodoMock}
        deleteTodo={deleteTodoMock}
      />
    );

    todos.forEach((todo) => {
      const taskElement = screen.getByText(todo.text);
      expect(taskElement).toBeInTheDocument();
    });
  });

  test("Проверка отображения пустого списка", () => {
    const { container } = render(
      <TodoList
        todos={[]}
        toggleTodo={toggleTodoMock}
        deleteTodo={deleteTodoMock}
      />
    );

    expect(container.firstChild).toBeEmptyDOMElement();
  });
});
