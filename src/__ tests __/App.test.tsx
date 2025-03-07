import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";
import { Todo } from "../App";



describe("App Component", () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  test("Проверка отображения страницы", () => {
    render(<App />);

    const header = screen.getByText("todos");
    expect(header).toBeInTheDocument();

    const allTab = screen.getByText("All");
    expect(allTab).toHaveClass("active");
  });

  test("Проверка фильтрации задач", () => {
    const initialTodos: Todo[] = [
      { id: 1, text: "Task 1", completed: false },
      { id: 2, text: "Task 2", completed: true },
    ];
    window.localStorage.setItem("todos", JSON.stringify(initialTodos));

    render(<App />);

    const task1 = screen.getByText("Task 1");
    const task2 = screen.getByText("Task 2");
    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();

    const completedTab = screen.getByText("Completed");
    fireEvent.click(completedTab);

    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();

    const incompleteTab = screen.getByText("Incomplete");
    fireEvent.click(incompleteTab);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  test("Проверка сохранения задач в localStorage", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const savedTasks = JSON.parse(window.localStorage.getItem("todos") || "[]");
    expect(savedTasks).toEqual([
      { id: expect.any(Number), text: "New Task", completed: false },
    ]);
  });
});
