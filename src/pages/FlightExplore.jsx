// src/pages/FlightExplore.jsx
import { useEffect, useState } from "react";
import { flightsData } from "../data/flightData"; // ⚠️ certifique-se que o nome é "flightsData"
import { FlightChoose } from "../components";

const FlightExplore = () => {
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem("flightSearch"));

    if (savedSearch) {
      const results = flightsData.filter((flight) => {
        const matchOrigin = flight.origin
          .toLowerCase()
          .includes(savedSearch.origin.toLowerCase());
        const matchDestination = flight.destination
          .toLowerCase()
          .includes(savedSearch.destination.toLowerCase());

        // ✅ Se não tiver data, ignora o filtro de data
        const matchDate =
          !savedSearch.date ||
          savedSearch.date.trim() === "" ||
          flight.date === savedSearch.date;

        return matchOrigin && matchDestination && matchDate;
      });

      setFilteredFlights(results);
    }
  }, []);

  return (
    <div className="px-8 w-full flex flex-col">
      <h2 className="text-[#605DEC] text-2xl font-semibold mt-10 mb-6 text-center">
        Resultados da sua busca
      </h2>

      {filteredFlights.length > 0 ? (
        <FlightChoose flights={filteredFlights} />
      ) : (
        <p className="text-center text-[#7C8DB0] mt-10">
          Nenhum voo encontrado para essa rota.
        </p>
      )}
    </div>
  );
};

export default FlightExplore;
