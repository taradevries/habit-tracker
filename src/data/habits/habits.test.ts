import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { useHabitsData } from "./habits";
import { HabitActionTypes } from "./types";

describe("useHabitsData", () => {
  test("initializes with empty data", () => {
    const { result } = renderHook(() => useHabitsData(new Date(2022, 6, 31)));

    const { habits } = result.current;

    expect(habits).toStrictEqual([]);
  });

  test("initializes with provided data", () => {
    const initialData = {
      "2022-07-31": [{ text: "write unit tests", completed: true }],
      template: [{ text: "write unit tests", completed: false }],
    };
    const { result } = renderHook(() =>
      useHabitsData(new Date(2022, 6, 31), initialData)
    );

    const { habits } = result.current;

    expect(habits).toStrictEqual([
      { text: "write unit tests", completed: true },
    ]);
  });

  test("adds a new habit to template and active date's habits", () => {
    const initialData = {
      "2022-07-31": [{ text: "write unit tests", completed: true }],
      template: [{ text: "write unit tests", completed: false }],
    };
    const { result } = renderHook(() =>
      useHabitsData(new Date(2022, 6, 31), initialData)
    );

    const { updateHabits } = result.current;

    act(() =>
      updateHabits({
        type: HabitActionTypes.addHabbit,
        data: "test the reducer",
      })
    );

    expect(result.current.habits).toStrictEqual([
      { text: "write unit tests", completed: true },
      { text: "test the reducer", completed: false },
    ]);
  });

  test.each([
    [true, false],
    [false, true],
  ])(
    "toggles %s completion status to %s",
    (initial: boolean, expected: boolean) => {
      const initialData = {
        "2022-07-31": [{ text: "write unit tests", completed: initial }],
        template: [{ text: "write unit tests", completed: false }],
      };
      const { result } = renderHook(() =>
        useHabitsData(new Date(2022, 6, 31), initialData)
      );

      const { updateHabits } = result.current;

      act(() =>
        updateHabits({
          type: HabitActionTypes.toggleHabitCompletion,
          data: { text: "write unit tests", completed: initial },
        })
      );

      expect(result.current.habits).toStrictEqual([
        { text: "write unit tests", completed: expected },
      ]);
    }
  );

  test("updates the active date", () => {
    const initialData = {
      "2022-07-31": [{ text: "write unit tests", completed: false }],
      template: [{ text: "write unit tests", completed: false }],
    };
    const { result } = renderHook(() =>
      useHabitsData(new Date(2022, 6, 30), initialData)
    );

    const { setActiveDate } = result.current;
    expect(result.current.habits).toStrictEqual([]);

    act(() => setActiveDate(new Date(2022, 6, 31)));

    expect(result.current.habits).toStrictEqual([
      { text: "write unit tests", completed: false },
    ]);
  });

  test("updates the active date and uses template if empty", async () => {
    const initialData = {
      "2022-07-31": [{ text: "write unit tests", completed: false }],
      template: [
        { text: "write unit tests", completed: false },
        { text: "write documentation", completed: false },
      ],
    };
    const { result } = renderHook(() =>
      useHabitsData(new Date(2022, 6, 31), initialData)
    );

    const { setActiveDate } = result.current;
    expect(result.current.habits).toStrictEqual([
      { text: "write unit tests", completed: false },
    ]);

    act(() => setActiveDate(new Date(2022, 7, 1)));

    await waitFor(() =>
      expect(result.current.habits).toStrictEqual([
        { text: "write unit tests", completed: false },
        { text: "write documentation", completed: false },
      ])
    );
  });
});
