import { renderHook } from "@testing-library/react-hooks";
import {
  addDays,
  isToday,
  isTomorrow,
  nextDay,
  startOfToday,
  startOfTomorrow,
} from "date-fns";
import { FC } from "react";
import { act } from "react-dom/test-utils";
import { DateContextProvider, useDate } from "./DateContext";

const wrapper: FC = ({ children }) => (
  <DateContextProvider>{children}</DateContextProvider>
);

describe("useDate (context)", () => {
  test("throws an error if used outside of context provider", () => {
    const { result } = renderHook(() => useDate());
    expect(() => result.current).toThrowError();
  });

  test("uses today's date as the default active date", () => {
    const { result } = renderHook(() => useDate(), { wrapper });
    expect(isToday(result.current.activeDate)).toBeTruthy();
  });

  test("uses active date when onActiveDateChange is called with undefined", () => {
    const { result } = renderHook(() => useDate(), { wrapper });
    act(() => {
      // set active day to tomorrow
      result.current.onActiveDateChange(addDays(result.current.activeDate, 1));
    });
    expect(isTomorrow(result.current.activeDate)).toBeTruthy();
    act(() => {
      result.current.onActiveDateChange();
    });
    expect(isTomorrow(result.current.activeDate)).toBeTruthy();
  });

  test("adds active date to completed dates when onToggleCompleted is called and active date is incomplete", () => {
    const { result } = renderHook(() => useDate(), { wrapper });
    act(() => {
      result.current.onToggleCompleted();
    });
    expect(result.current.completedDates).toContainEqual(startOfToday());
  });

  test("removes active date from completed dates when onToggleCompleted is called and active date is complete", () => {
    const { result } = renderHook(() => useDate(), { wrapper });
    act(() => {
      // add today as completed
      result.current.onToggleCompleted();
    });
    act(() => {
      // set active day to tomorrow
      result.current.onActiveDateChange(addDays(result.current.activeDate, 1));
    });
    act(() => {
      // add tomorrow as completed
      result.current.onToggleCompleted();
    });
    expect(result.current.completedDates).toStrictEqual([
      startOfToday(),
      startOfTomorrow(),
    ]);

    act(() => {
      // reset active day to today
      result.current.onActiveDateChange(addDays(result.current.activeDate, -1));
    });
    act(() => {
      result.current.onToggleCompleted();
    });
    expect(result.current.completedDates).not.toContainEqual(startOfToday());
  });
});
