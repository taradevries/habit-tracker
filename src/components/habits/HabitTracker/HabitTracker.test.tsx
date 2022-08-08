import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import { HabitTracker } from "./HabitTracker";
import { Habit } from "../../../data/habits/types";

jest.mock("../../../data/habits/habits", () => ({
  useHabitsData: () => mockUseHabitsData(),
}));
jest.mock("../../../context/DateContext", () => ({
  useDate: () => mockUseDate(),
}));

let mockUseHabitsData = jest.fn(() => useHabitsDataMockReturnValue);

const useHabitsDataMockReturnValue = {
  habits: [] as Habit[],
  updateHabits: jest.fn(),
  setActiveDate: jest.fn(),
};

let mockUseDate = jest.fn(() => useDateMockReturnValue);

const useDateMockReturnValue = {
  activeDate: faker.date.soon(),
  onActiveDateChange: jest.fn(),
  onToggleCompleted: jest.fn(),
};

beforeEach(() => {
  // because default CRA 4+ config resets mocks after each test
  mockUseHabitsData = jest.fn(() => useHabitsDataMockReturnValue);
  mockUseDate = jest.fn(() => useDateMockReturnValue);
});

const makeHabit = (overrides?: any) => ({
  text: faker.lorem.sentence(),
  completed: faker.datatype.boolean(),
  ...overrides,
});

describe("HabitTracker component", () => {
  test("renders the active date from context", () => {
    render(<HabitTracker />);
    expect(
      screen.getByRole("heading", {
        name: format(useDateMockReturnValue.activeDate, "iiii, MMMM do"),
        level: 2,
      })
    ).toBeInTheDocument();
  });

  test.each([[true], [false]])(
    "toggles the completion status of the active date when initial is %s",
    async (initial: boolean) => {
      const habitMock = makeHabit({ completed: initial });
      mockUseHabitsData.mockReturnValueOnce({
        ...useHabitsDataMockReturnValue,
        habits: [habitMock],
      });
      const onToggleCompletedMock = useDateMockReturnValue.onToggleCompleted;

      render(<HabitTracker />);

      userEvent.click(screen.getByLabelText(habitMock.text));

      expect(onToggleCompletedMock).toHaveBeenCalled();
      expect(onToggleCompletedMock).toHaveBeenCalledTimes(1);
    }
  );

  test("toggles the completion status when habits are completed and new habit is added", () => {
    const habitMock = makeHabit({ completed: true });
    const addedHabit = faker.lorem.sentence();
    mockUseHabitsData.mockReturnValue({
      ...useHabitsDataMockReturnValue,
      habits: [habitMock],
    });
    const onToggleCompletedMock = useDateMockReturnValue.onToggleCompleted;

    render(<HabitTracker />);

    userEvent.type(screen.getByLabelText(/add habit/i), `${addedHabit}{enter}`);

    expect(onToggleCompletedMock).toHaveBeenCalled();
    expect(onToggleCompletedMock).toHaveBeenCalledTimes(1);
  });
});
