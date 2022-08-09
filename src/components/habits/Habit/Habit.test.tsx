import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Habit } from "./Habit";

describe("Habit component", () => {
  test("renders a completed habit", () => {
    render(<Habit text="test habit" completed />);
    // the following expects are functionally equivalent
    // but toBeChecked gives better feedback when failing:
    // expect(
    //   screen.getByRole("checkbox", { name: /test habit/i, checked: true })
    // ).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: /test habit/i })).toBeChecked();
  });

  test("renders an uncompleted habit", () => {
    render(<Habit text="test habit" />);
    // the following expects are functionally equivalent:
    // but toBeChecked gives better feedback when failing:
    // expect(
    //   screen.getByRole("checkbox", { name: /test habit/i, checked: false })
    // ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /test habit/i })
    ).not.toBeChecked();
  });

  test("calls onToggleCompleted when provided", () => {
    const onToggleCompletedMock = jest.fn();
    render(
      <Habit text="test habit" onToggleCompleted={onToggleCompletedMock} />
    );

    userEvent.click(screen.getByRole("checkbox", { name: /test habit/i }));
    expect(onToggleCompletedMock).toBeCalledWith(true);
  });
});
