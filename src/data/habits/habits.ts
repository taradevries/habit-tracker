import { useCallback, useMemo, useReducer, useState } from "react";
import { Habit, HabitActionTypes, HabitReducer, HabitsByDay } from "./types";
import { format } from "date-fns";

export const useHabitsData = (defaultDate: Date, habitsData?: HabitsByDay) => {
  const [activeDate, setActiveDate] = useState<Date>(defaultDate);

  const monthYearFormat = "yyyy-MM";
  const dateFormat = `${monthYearFormat}-dd`;
  const formattedActiveDate = format(activeDate, dateFormat);

  const [data, dispatch] = useReducer<HabitReducer>(
    (state, action): HabitsByDay => {
      switch (action.type) {
        case HabitActionTypes.addHabbit: {
          const newHabit = { text: action.data as string, completed: false };
          return {
            ...state,
            [formattedActiveDate]: [...state[formattedActiveDate], newHabit],
            template: [...state.template, newHabit],
          };
        }
        case HabitActionTypes.toggleHabitCompletion: {
          const currentHabits = [...state[formattedActiveDate]];
          const habitToUpdateIdx = currentHabits.findIndex(
            ({ text }) => text === (action.data as Habit).text
          );
          const habitToUpdate = currentHabits[habitToUpdateIdx];
          const newActiveDateHabits = [
            ...currentHabits.slice(0, habitToUpdateIdx),
            { ...habitToUpdate, completed: !habitToUpdate.completed },
            ...currentHabits.slice(habitToUpdateIdx + 1, currentHabits.length),
          ];
          return {
            ...state,
            [formattedActiveDate]: newActiveDateHabits,
          };
        }
        case HabitActionTypes.initializeDate:
          return {
            ...state,
            [action.data.toString()]: [...state.template],
          };
        default:
          return state;
      }
    },
    habitsData || { [formattedActiveDate]: [], template: [] }
  );

  const habits = useMemo(
    () => data[formattedActiveDate] || [],
    [data, formattedActiveDate]
  );

  const handleActiveDateChange = useCallback(
    (newActiveDate: Date) => {
      const newActiveDateKey = format(newActiveDate, dateFormat);
      if (!data[newActiveDateKey]) {
        dispatch({
          type: HabitActionTypes.initializeDate,
          data: newActiveDateKey,
        });
      }
      setActiveDate(newActiveDate);
    },
    [data, dateFormat]
  );

  return {
    setActiveDate: handleActiveDateChange,
    habits,
    updateHabits: dispatch,
  };
};
