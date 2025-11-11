import { createContext, useContext, useState } from "react";

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    date: "",
    passengers: 1,
  });

  return (
    <FlightContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlight = () => useContext(FlightContext);
