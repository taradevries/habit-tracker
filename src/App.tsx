import React, { FC } from "react";
import styled from "styled-components";
import "react-day-picker/dist/style.css";
import { DateContextProvider } from "./context/DateContext";

const Title = styled.h1`
  font-size: 4rem;
`;

const Content = styled.div`
  display: grid;
  grid-auto-flow: columns;
  grid-template-columns: 2fr 1fr;
`;

const App: FC = () => (
  <>
    <Title>Habits</Title>
    <Content>
      <DateContextProvider>
        <main>{/* this will be the active Habit component*/}</main>
        <div role="complementary">
          {/* this will be the calendar component */}
        </div>
      </DateContextProvider>
    </Content>
  </>
);

export default App;
