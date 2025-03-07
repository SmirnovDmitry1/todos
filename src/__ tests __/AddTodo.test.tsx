import { render, fireEvent } from "@testing-library/react";
import { AddTodo } from "../components";

describe("App Component", () => {
  test("Проверка добавления новой задачи", () => {
    const addTodo = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <AddTodo addTodo={addTodo} />
    );

    const input = getByPlaceholderText("Add a new task");
    const button = getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(addTodo).toHaveBeenCalledWith("New Task");
  });
});
