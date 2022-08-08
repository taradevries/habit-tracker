import { isSameDay, startOfDay } from "date-fns";
import React, { FC, useContext, useState } from "react";
import { DateContextValue } from "./types";

const DateContext = React.createContext<DateContextValue | undefined>(
  undefined
);

const DateContextProvider: FC = ({ children }) => {
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [completedDates, setCompletedDates] = useState<Date[]>([]);

  const handleToggleCompleted = () => {
    const startOfActiveDate = startOfDay(activeDate);
    const dateIdx = completedDates.findIndex((date) =>
      isSameDay(date, startOfActiveDate)
    );
    if (dateIdx === -1) {
      return setCompletedDates([...completedDates, startOfActiveDate]);
    }

    setCompletedDates([
      ...completedDates.slice(0, dateIdx),
      ...completedDates.slice(dateIdx + 1, completedDates.length),
    ]);
  };

  return (
    <DateContext.Provider
      value={{
        activeDate,
        completedDates,
        onActiveDateChange: (date?) => setActiveDate(date || activeDate),
        onToggleCompleted: handleToggleCompleted,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

const useDate = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error("useDate was not used within a DateProvider");
  }
  return context;
};

export { DateContextProvider, useDate };
