import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import DateContext from "../../../context/DateContext";
import { HabitTracker } from "./HabitTracker";
import { Habit } from "../../../data/habits/types";

jest.mock("../../../data/habits/habits", () => ({
  useHabitsData: () => mockUseHabitsData(),
}));

let mockUseHabitsData = jest.fn(() => useHabitsDataMockReturnValue);

const useHabitsDataMockReturnValue = {
  habits: [] as Habit[],
  updateHabits: jest.fn(),
  setActiveDate: jest.fn(),
};

beforeEach(() => {
  // because default CRA 4+ config resets mocks after each test
  mockUseHabitsData = jest.fn(() => useHabitsDataMockReturnValue);
});

const makeHabit = (overrides?: any) => ({
  text: faker.lorem.sentence(),
  completed: faker.datatype.boolean(),
  ...overrides,
});

describe("HabitTracker component", () => {
  test("renders the active date from context", () => {
    const mockDate = faker.date.soon();
    render(
      <DateContext.Provider
        value={{
          activeDate: mockDate,
          onActiveDateChange: jest.fn(),
          onToggleCompleted: jest.fn(),
        }}
      >
        <HabitTracker />
      </DateContext.Provider>
    );
    expect(
      screen.getByRole("heading", {
        name: format(mockDate, "iiii, MMMM do"),
        level: 2,
      })
    ).toBeInTheDocument();
  });

  test.each([[true], [false]])(
    "toggles the completion status of the active date when initial is %s",
    async (initial: boolean) => {
      const habitMock = makeHabit({ completed: initial });
      const habitMockToggled = {
        ...habitMock,
        completed: !habitMock.completed,
      };
      mockUseHabitsData
        .mockReturnValueOnce({
          ...useHabitsDataMockReturnValue,
          habits: [habitMock],
        })
        .mockReturnValue({
          ...useHabitsDataMockReturnValue,
          habits: [habitMockToggled],
        });
      const onToggleCompletedMock = jest.fn();
      render(
        <DateContext.Provider
          value={{
            activeDate: faker.date.soon(),
            onActiveDateChange: jest.fn(),
            onToggleCompleted: onToggleCompletedMock,
          }}
        >
          <HabitTracker />
        </DateContext.Provider>
      );
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
    const onToggleCompletedMock = jest.fn();
    render(
      <DateContext.Provider
        value={{
          activeDate: faker.date.soon(),
          onActiveDateChange: jest.fn(),
          onToggleCompleted: onToggleCompletedMock,
        }}
      >
        <HabitTracker />
      </DateContext.Provider>
    );
    userEvent.type(screen.getByLabelText(/add habit/i), `${addedHabit}{enter}`);

    expect(onToggleCompletedMock).toHaveBeenCalled();
    expect(onToggleCompletedMock).toHaveBeenCalledTimes(1);
  });
});
