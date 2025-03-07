import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { TodoItem } from "../components";

describe("TodoItem Component", () => {
  const toggleTodoMock = jest.fn();
  const deleteTodoMock = jest.fn();

  const todo = {
    id: 1,
    text: "Test Todo",
    completed: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Проверка отображения задачи", () => {
    render(
      <TodoItem
        todo={todo}
        toggleTodo={toggleTodoMock}
        deleteTodo={deleteTodoMock}
      />
    );

    const todoText = screen.getByText("Test Todo");
    expect(todoText).toBeInTheDocument();
  });

  test("Проверка переключения состояния задачи", () => {
    render(
      <TodoItem
        todo={todo}
        toggleTodo={toggleTodoMock}
        deleteTodo={deleteTodoMock}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(toggleTodoMock).toHaveBeenCalledWith(1);
  });

  test("Проверка удаления задачи", () => {
    render(
      <TodoItem
        todo={todo}
        toggleTodo={toggleTodoMock}
        deleteTodo={deleteTodoMock}
      />
    );

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(deleteTodoMock).toHaveBeenCalledWith(1);
  });
});
