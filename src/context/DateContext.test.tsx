import { render, screen } from "@testing-library/react";
import React, { FC, useContext } from "react";
import DateContext, { DateContextProvider } from "./DateContext";

const TestConsumer: FC = () => {
  const activeDate = useContext(DateContext);
  return <>{activeDate}</>;
};

test("provides the active date from context", () => {
  render(
    <DateContextProvider>
      <TestConsumer />
    </DateContextProvider>
  );

  const;
});
