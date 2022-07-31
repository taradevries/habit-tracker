import React, { FC, useState } from "react";

export interface DateContextValue {
  activeDate: Date;
  onActiveDateChange: (date: Date) => void;
}

const initialValue: DateContextValue = {
  activeDate: new Date(),
  onActiveDateChange: (_) => {
    return;
  },
};

const DateContext = React.createContext(initialValue);

const DateContextProvider: FC = ({ children }) => {
  const [activeDate, setActiveDate] = useState(new Date());
  return (
    <DateContext.Provider
      value={{
        activeDate,
        onActiveDateChange: (date: Date) => setActiveDate(date),
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export default DateContext;
export { DateContextProvider };
