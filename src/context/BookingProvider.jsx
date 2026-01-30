import { useState } from "react";
import { BookingContext } from "./BookingContext";

const BookingProvider = ({ children }) => {
  const [seats, setSeats] = useState([]);

  return (
    <BookingContext.Provider value={{ seats, setSeats }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
