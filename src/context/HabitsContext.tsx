import React, { FC } from "react";
import { useHabitsData } from "../data/habits/habits";

// export interface HabitsContextValue {
//   activeDate: Date;
//   handleActiveDateChange: (date?: Date) => void;
// }

// const initialValue: HabitsContextValue = {
//   activeDate: new Date(),
//   handleActiveDateChange: (_) => {
//     return;
//   },
// };
const noop = () => {
  return;
};

const HabitsContext = React.createContext({
  useGetHabits: noop,
});

const HabitsContextProvider: FC = ({ children }) => {
  return (
    <HabitsContext.Provider value={useHabitsData(new Date())}>
      {children}
    </HabitsContext.Provider>
  );
};

export default HabitsContext;
export { HabitsContextProvider };
