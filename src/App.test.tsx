import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App title", () => {
  render(<App />);
  const title = screen.getByRole("heading", { level: 1, name: /habits/i });
  expect(title).toBeInTheDocument();
});

test("renders main and complementary content", () => {
  render(<App />);

  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();

  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toBeInTheDocument();
});
