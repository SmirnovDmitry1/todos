import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Tabs } from "../components";
import { Tab } from "../App";



describe("Tabs Component", () => {
  const setActiveTabMock = jest.fn();

  const props = {
    activeTab: "all" as Tab,
    setActiveTab: setActiveTabMock,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Проверка отображения активной вкладки", () => {
    render(<Tabs {...props} />);

    const allButton = screen.getByText("All");
    expect(allButton).toHaveClass("active");

    const completedButton = screen.getByText("Completed");
    const incompleteButton = screen.getByText("Incomplete");
    expect(completedButton).not.toHaveClass("active");
    expect(incompleteButton).not.toHaveClass("active");
  });

  test("Проверка переключения вкладок", () => {
    render(<Tabs {...props} />);

    const completedButton = screen.getByText("Completed");
    fireEvent.click(completedButton);

    expect(setActiveTabMock).toHaveBeenCalledWith("completed");

    const incompleteButton = screen.getByText("Incomplete");
    fireEvent.click(incompleteButton);

    expect(setActiveTabMock).toHaveBeenCalledWith("incomplete");
  });

  test("Проверка отображения активной вкладки после изменения пропсов", () => {
    const { rerender } = render(<Tabs {...props} />);

    const allButton = screen.getByText("All");
    expect(allButton).toHaveClass("active");

    rerender(<Tabs activeTab="completed" setActiveTab={setActiveTabMock} />);

    const completedButton = screen.getByText("Completed");
    expect(completedButton).toHaveClass("active");
  });
});
