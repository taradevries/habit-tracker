import React, { FC, useContext } from "react";
import { DayPicker } from "react-day-picker";
import { useDate } from "../../context/DateContext";

import "react-day-picker/dist/style.css";

const completedStyles = {
  backgroundColor: "#d63a4f",
};

const selectedStyles = {
  backgroundColor: "#94cdff",
};

export const Calendar: FC = () => {
  const {
    activeDate,
    completedDates = [],
    onActiveDateChange: handleActiveDateChange,
  } = useDate();

  return (
    <DayPicker
      required
      mode="single"
      selected={activeDate}
      onSelect={handleActiveDateChange}
      modifiers={{ completed: completedDates }}
      modifiersStyles={{ completed: completedStyles, selected: selectedStyles }}
    />
  );
};
