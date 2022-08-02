import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import DateContext from "../../../context/DateContext";
import { useHabitsData } from "../../../data/habits/habits";
import { Habit, HabitActionTypes } from "../../../data/habits/types";
import { HabitList } from "../HabitList/HabitList";

const Title = styled.h2`
  font-size: 2.5rem;
`;

const AddHabitButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
  }
`;

export const HabitTracker: FC = () => {
  const { activeDate, onToggleCompleted } = useContext(DateContext);
  const { useGetHabits, useUpdateHabits, setActiveDate } = useHabitsData(
    new Date()
  );
  const habits = useGetHabits();
  const [dispatch] = useUpdateHabits();
  const [allHabitsCompleted, setAllHabitsCompleted] = useState(true);

  const formattedActiveDate = format(activeDate, "iiii, MMMM do");

  useEffect(() => {
    setActiveDate(activeDate);
  }, [activeDate, setActiveDate]);

  useEffect(() => {
    const areAllHabitsComplete = habits.reduce(
      (prev, { completed }) => prev && completed,
      true
    );
    if (areAllHabitsComplete !== allHabitsCompleted) {
      onToggleCompleted();
      setAllHabitsCompleted((value) => !value);
    }
  }, [allHabitsCompleted, habits, onToggleCompleted]);

  const handleToggleCompleted = (habit: Habit) => {
    dispatch({ type: HabitActionTypes.toggleHabitCompletion, data: habit });
  };

  return (
    <>
      <Title>{formattedActiveDate}</Title>
      <HabitList habits={habits} onToggleCompleted={handleToggleCompleted} />
      <AddHabitButton>
        <FontAwesomeIcon icon={faPlus} aria-hidden /> Add habit
      </AddHabitButton>
    </>
  );
};
