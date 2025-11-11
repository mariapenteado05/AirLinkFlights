// src/pages/FlightChoose.jsx
import { useState } from "react";
import { map } from "../assets/images";
import { FlightCard } from "../container";
import FlightDetails from "../components/FlightDetails";
import { Link, useNavigate } from "react-router-dom";

const FlightChoose = ({ flights = [] }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    try {
      // salva imediatamente para garantir leitura posterior
      localStorage.setItem("selectedFlight", JSON.stringify(flight));
      console.log("saved selectedFlight:", flight);
    } catch (err) {
      console.error("Erro ao salvar selectedFlight:", err);
    }
  };

  const handleSaveAndContinue = () => {
    if (!selectedFlight) return;
    // garantir que está salvo
    localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));
    navigate("/passenger-info");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-16 px-6 lg:px-20 mt-10">
      {/* Lista de voos */}
      <div className="w-full lg:w-[872px] flex flex-col gap-6 items-center justify-center">
        <div className="flex items-center justify-center w-full">
          <h1 className="text-[#6E7491] text-lg lg:text-xl leading-6 font-semibold text-center">
            Escolha um voo de <span className="text-[#605DEC]">ida</span>
          </h1>
        </div>

        <div className="w-full flex flex-col items-center justify-center border border-[#E9E8FC] rounded-xl shadow-sm">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div
                key={flight.id}
                className={`w-full cursor-pointer border-b border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 ${selectedFlight?.id === flight.id ? "bg-[#E9E8FC]" : ""}`}
                onClick={() => handleSelectFlight(flight)}
              >
                <FlightCard
                  img={flight.img}
                  duration={flight.duration}
                  name={flight.airline}
                  time={flight.time}
                  stop={flight.stop}
                  hnl={flight.connection}
                  price={`R$ ${flight.price}`}
                  trip="ida"
                  origin={flight.origin}
                  destination={flight.destination}
                />
              </div>
            ))
          ) : (
            <p className="text-[#7C8DB0] text-center py-6">Nenhum voo disponível para esta rota.</p>
          )}
        </div>

        <div className="w-full lg:mt-12">
          <img src={map} alt="mapa" className="w-full h-full object-cover rounded-md shadow-sm" />
        </div>
      </div>

      {/* Detalhes da passagem */}
      <div className="w-full lg:w-[350px]">
        {selectedFlight ? (
          <>
            <FlightDetails flight={selectedFlight} />
            <button
              onClick={handleSaveAndContinue}
              className="w-full mt-4 text-[#605DEC] border-2 border-[#605DEC] py-2 px-4 rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200"
            >
              Salvar e continuar
            </button>
          </>
        ) : (
          <p className="text-[#7C8DB0]">Nenhum voo selecionado.</p>
        )}
      </div>
    </div>
  );
};

export default FlightChoose;
