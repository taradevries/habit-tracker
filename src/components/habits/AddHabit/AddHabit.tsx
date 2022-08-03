import React, { ChangeEvent, KeyboardEvent, FC, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddHabitLabel = styled.label`
  font-size: 1rem;
  cursor: pointer;
  &:hover {
  }
`;

const AddHabitWrapper = styled.div``;

const AddHabitInput = styled.input`
  background-color: transparent;
  border: none;
`;

interface AddHabitProps {
  onHabitAdded: (habitText: string) => void;
  validateHabit: (habitText: string) => boolean;
}

export const AddHabit: FC<AddHabitProps> = ({
  onHabitAdded,
  validateHabit,
}) => {
  const [newHabit, setNewHabit] = useState<string>();

  const handleValueChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNewHabit(target.value);
  };

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key !== "Enter") return;
    if (newHabit && validateHabit(newHabit)) onHabitAdded(newHabit);
  };

  return (
    <AddHabitWrapper>
      <AddHabitLabel htmlFor="add-habit">
        <FontAwesomeIcon icon={faPlus} aria-hidden /> Add habit
      </AddHabitLabel>
      <AddHabitInput
        id="add-habit"
        name="add-habit"
        type="text"
        onChange={handleValueChanged}
        onKeyDown={handleKeyDown}
      />
    </AddHabitWrapper>
  );
};
