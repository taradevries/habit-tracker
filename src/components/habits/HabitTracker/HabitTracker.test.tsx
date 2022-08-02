import { render, screen, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import DateContext from "../../../context/DateContext";
import { HabitTracker } from "./HabitTracker";
import { useHabitsData } from "../../../data/habits/habits";
import userEvent from "@testing-library/user-event";

jest.mock("../../../data/habits/habits", () => ({
  useHabitsData: (_: Date) => ({
    useGetHabits: jest.fn().mockReturnValue([]),
    useUpdateHabits: jest.fn().mockReturnValue([jest.fn()]),
    setActiveDate: jest.fn(),
  }),
}));

const mockUseHabitsData = useHabitsData as jest.MockedFunction<
  typeof useHabitsData
>;

const useHabitsDataMockValue = {
  useGetHabits: jest.fn().mockReturnValue([]),
  useUpdateHabits: jest.fn().mockReturnValue([jest.fn()]),
  setActiveDate: jest.fn(),
};

const makeHabit = () => ({
  text: faker.lorem.text(),
  completed: faker.datatype.boolean(),
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

  test("toggles the completion status of the active date", async () => {
    const habitMock = makeHabit();
    const habitMockToggled = { ...habitMock, completed: !habitMock.completed };
    mockUseHabitsData.mockReturnValue({
      ...useHabitsDataMockValue,
      useGetHabits: jest
        .fn()
        .mockReturnValueOnce([habitMock])
        .mockReturnValue([habitMockToggled]),
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
    await waitFor(() => {
      expect(onToggleCompletedMock).toHaveBeenCalled();
    });
  });
});
