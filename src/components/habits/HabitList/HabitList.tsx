import { nanoid } from "nanoid";
import React, { FC } from "react";
import styled from "styled-components";
import { Habit as HabitType } from "../../../data/habits/types";
import { Habit } from "../Habit/Habit";

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

interface HabitListProps {
  habits: HabitType[];
  onToggleCompleted: (habit: HabitType) => void;
}

export const HabitList: FC<HabitListProps> = ({
  habits,
  onToggleCompleted,
}) => {
  const handleToggleCompleted = (habit: HabitType) => {
    return () => onToggleCompleted(habit);
  };

  return (
    <List>
      {habits.map((habit) => (
        // explicit role provided due to list-style-type: none
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listitem_role
        <ListItem key={nanoid()} role="listitem">
          <Habit {...habit} onToggleCompleted={handleToggleCompleted(habit)} />
        </ListItem>
      ))}
    </List>
  );
};
