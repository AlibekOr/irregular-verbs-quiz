import React, { useReducer } from "react";
import BookingForm from "./BookingForm";

export const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    default:
      return state;
  }
};

function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <div className="App">
      <header style={{ textAlign: "center", margin: "20px 0" }}>
        <h1>Little Lemon Restaurant</h1>
        <h2>Table Reservation</h2>
      </header>
      <main>
        <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
      </main>
    </div>
  );
}

export default App;
