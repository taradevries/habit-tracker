import React, { FC, useContext, useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import DateContext from "../../../context/DateContext";
import { useHabitsData } from "../../../data/habits/habits";
import { Habit, HabitActionTypes } from "../../../data/habits/types";
import { HabitList } from "../HabitList/HabitList";
import { AddHabit } from "../AddHabit/AddHabit";

const Title = styled.h2`
  font-size: 2.5rem;
`;

export const HabitTracker: FC = () => {
  const { activeDate, onToggleCompleted } = useContext(DateContext);
  const { habits, updateHabits, setActiveDate } = useHabitsData(activeDate);

  const formattedActiveDate = format(activeDate, "iiii, MMMM do");

  useEffect(() => {
    setActiveDate(activeDate);
  }, [activeDate, setActiveDate]);

  const areAllHabitsComplete = () =>
    !!habits.length &&
    habits.reduce((prev, { completed }) => prev && completed, true);

  const willAllHabitsBeComplete = (habit: Habit) =>
    habits.reduce(
      (prev, { completed, text }) => prev && (completed || text === habit.text),
      true
    );

  const handleToggleCompletedHabit = (habit: Habit) => {
    updateHabits({ type: HabitActionTypes.toggleHabitCompletion, data: habit });

    if (areAllHabitsComplete() || willAllHabitsBeComplete(habit))
      onToggleCompleted();
  };

  const handleHabitAdded = (habitText: string) => {
    updateHabits({ type: HabitActionTypes.addHabbit, data: habitText });
    if (areAllHabitsComplete()) onToggleCompleted();
  };

  const validateHabit = (habitText: string) =>
    !!habitText && !habits.find(({ text }) => text === habitText);

  return (
    <>
      <Title>{formattedActiveDate}</Title>
      <HabitList
        habits={habits}
        onToggleCompleted={handleToggleCompletedHabit}
      />
      <AddHabit onHabitAdded={handleHabitAdded} validateHabit={validateHabit} />
    </>
  );
};
