import React, { FC } from "react";
import styled from "styled-components";
import { Calendar } from "./components/Calendar/Calendar";
import { HabitTracker } from "./components/habits/HabitTracker/HabitTracker";
import { DateContextProvider } from "./context/DateContext";

const AppLayout = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: grid;
  grid-auto-flow: columns;
  grid-template-columns: 2fr 1fr;
  justify-content: space-around;
`;

const App: FC = () => (
  <AppLayout>
    <Title>Habits</Title>
    <Content>
      <DateContextProvider>
        <main>
          <HabitTracker />
        </main>
        <div role="complementary">
          <Calendar />
        </div>
      </DateContextProvider>
    </Content>
  </AppLayout>
);

export default App;
