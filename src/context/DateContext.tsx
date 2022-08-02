import { isSameDay, startOfDay } from "date-fns";
import React, { FC, useState } from "react";

export interface DateContextValue {
  activeDate: Date;
  completedDates?: Date[];
  onActiveDateChange: (date?: Date) => void;
  onToggleCompleted: () => void;
}

const initialValue: DateContextValue = {
  activeDate: new Date(),
  completedDates: [],
  onActiveDateChange: (_) => {
    return;
  },
  onToggleCompleted: () => {
    return;
  },
};

const DateContext = React.createContext(initialValue);

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
      ...completedDates.slice(dateIdx, completedDates.length),
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

export default DateContext;
export { DateContextProvider };
