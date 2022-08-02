export type Habit = {
  text: string;
  completed: boolean;
};

export const enum HabitActionTypes {
  addHabbit,
  toggleHabitCompletion,
  initializeDate,
}

export interface HabitsByDay {
  template: Habit[];
  [date: string]: Habit[];
}

export type HabitActionData = Habit[] | Habit | string;

export type HabitReducer = (
  state: HabitsByDay,
  action: { type: HabitActionTypes; data: HabitActionData }
) => HabitsByDay;
