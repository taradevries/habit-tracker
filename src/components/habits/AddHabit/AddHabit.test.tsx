import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddHabit } from "./AddHabit";

describe("AddHabit component", () => {
  test("renders text input with label", () => {
    render(<AddHabit onHabitAdded={jest.fn()} validateHabit={jest.fn()} />);
    expect(
      screen.getByRole("textbox", { name: /add habit/i })
    ).toBeInTheDocument();
  });

  test("calls onHabitAdded when Enter key is hit if input is valid", () => {
    const mockValidate = jest.fn().mockReturnValue(true);
    const mockHabbitAdded = jest.fn();
    render(
      <AddHabit onHabitAdded={mockHabbitAdded} validateHabit={mockValidate} />
    );
    const habitText = faker.lorem.sentence();
    userEvent.type(
      screen.getByRole("textbox", { name: /add habit/i }),
      `${habitText}{enter}`
    );
    expect(mockValidate).toHaveBeenCalled();
    expect(mockHabbitAdded).toHaveBeenCalledWith(habitText);
  });

  test("does not call onHabitAdded when Enter key is hit if input is invalid", () => {
    const mockValidate = jest.fn().mockReturnValue(false);
    const mockHabbitAdded = jest.fn();
    render(
      <AddHabit onHabitAdded={mockHabbitAdded} validateHabit={mockValidate} />
    );
    const habitText = faker.lorem.sentence();
    userEvent.type(
      screen.getByRole("textbox", { name: /add habit/i }),
      `${habitText}{enter}`
    );
    expect(mockHabbitAdded).not.toHaveBeenCalled();
  });

  test("does not call onHabitAdded if Enter key is not hit", () => {
    const mockValidate = jest.fn().mockReturnValue(false);
    const mockHabbitAdded = jest.fn();
    render(
      <AddHabit onHabitAdded={mockHabbitAdded} validateHabit={mockValidate} />
    );
    const habitText = faker.lorem.sentence();
    userEvent.type(
      screen.getByRole("textbox", { name: /add habit/i }),
      habitText
    );
    expect(mockHabbitAdded).not.toHaveBeenCalled();
  });
});
