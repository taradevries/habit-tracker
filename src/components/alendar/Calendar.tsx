import React, { FC, useContext } from "react";
import { DayPicker } from "react-day-picker";
import DateContext from "../../context/DateContext";

import "react-day-picker/dist/style.css";

export const Calendar: FC = () => {
  const { activeDate, onActiveDateChange: handleActiveDateChange } =
    useContext(DateContext);
  return (
    <DayPicker
      required
      mode="single"
      selected={activeDate}
      onSelect={handleActiveDateChange}
    />
  );
};
