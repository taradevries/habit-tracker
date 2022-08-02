import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import { Checkbox } from "../../atoms/Checkbox";

const Strikethrough = styled.s`
  s::after {
    clip-path: inset(100%);
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  s::after {
    content: " [completed] ";
  }
`;

interface HabitProps {
  text: string;
  completed?: boolean;
  onToggleCompleted?: (completed: boolean) => void;
}

export const Habit: FC<HabitProps> = ({
  text,
  completed = false,
  onToggleCompleted,
}) => {
  const handleCheckboxChecked = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onToggleCompleted && onToggleCompleted(target.checked);
  };
  const checkboxLabel = completed ? (
    <Strikethrough>{text}</Strikethrough>
  ) : (
    text
  );
  return (
    <Checkbox
      label={checkboxLabel}
      value={completed}
      onChange={handleCheckboxChecked}
    />
  );
};
