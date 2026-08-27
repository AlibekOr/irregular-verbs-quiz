import { render, screen } from "@testing-library/react";
import App, { initializeTimes, updateTimes } from "./App";
import BookingForm from "./BookingForm";

test("Renders the BookingForm heading", () => {
  render(<BookingForm availableTimes={[]} />);
  const labelElement = screen.getByText("Choose date");
  expect(labelElement).toBeInTheDocument();
});

test("initializeTimes returns non-empty array", () => {
  const times = initializeTimes();
  expect(times.length).toBeGreaterThan(0);
});

test("updateTimes returns the same state passed to it", () => {
  const initialState = ["17:00", "18:00"];
  const action = { type: "UPDATE_TIMES", date: "2026-08-27" };
  const newState = updateTimes(initialState, action);
  expect(newState).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
});
