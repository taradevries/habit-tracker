import React, { FC, useContext } from "react";
import { DayPicker } from "react-day-picker";
import DateContext from "../../context/DateContext";

import "react-day-picker/dist/style.css";

const completedStyles = {
  backgroundColor: "#F00",
};

export const Calendar: FC = () => {
  const {
    activeDate,
    completedDates = [],
    onActiveDateChange: handleActiveDateChange,
  } = useContext(DateContext);

  return (
    <DayPicker
      required
      mode="single"
      selected={activeDate}
      onSelect={handleActiveDateChange}
      modifiers={{ completed: completedDates }}
      modifiersStyles={{ completed: completedStyles }}
    />
  );
};
