import { render, screen, within } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { HabitList } from "./HabitList";

const makeHabit = () => ({
  text: faker.lorem.text(),
  completed: faker.datatype.boolean(),
});

describe("HabitsList component", () => {
  test("renders list with listitems", () => {
    const mockHabits = [makeHabit(), makeHabit()];
    render(<HabitList habits={mockHabits} onToggleCompleted={jest.fn()} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(within(list).getAllByRole("listitem").length).toBe(2);
  });

  test("passes text and completed props to Habit child", () => {
    const mockHabits = [makeHabit()];
    render(<HabitList habits={mockHabits} onToggleCompleted={jest.fn()} />);
    expect(
      screen.getByRole("checkbox", {
        name: mockHabits[0].text,
        checked: mockHabits[0].completed,
      })
    ).toBeInTheDocument();
  });
});
