// src/components/FlightDetails.jsx
import React from "react";

const FlightDetails = ({ flight }) => {
  if (!flight) return null;

  return (
    <div className="flex flex-col gap-6 justify-start items-center lg:items-end mt-10 lg:mt-0 w-full lg:w-[350px] bg-white border border-[#E9E8FC] shadow-md rounded-xl p-6">
      <h2 className="text-[#605DEC] text-lg font-semibold text-center mb-2">
        Detalhes da passagem
      </h2>

      <div className="text-[#27273F] text-sm flex flex-col gap-2 w-full">
        <p><strong>Companhia:</strong> {flight.airline}</p>
        <p><strong>Origem:</strong> {flight.origin}</p>
        <p><strong>Destino:</strong> {flight.destination}</p>
        <p>
          <strong>Data:</strong>{" "}
          {flight.date ? new Date(flight.date).toLocaleDateString("pt-BR") : "Não informada"}
        </p>
        <p><strong>Horário:</strong> {flight.time}</p>
        <p><strong>Duração:</strong> {flight.duration}</p>
        <p><strong>Paradas:</strong> {flight.stop}</p>
        {flight.connection && <p><strong>Conexão:</strong> {flight.connection}</p>}
      </div>

      <div className="w-full border-t border-[#E9E8FC] pt-3 mt-2 text-center">
        <p className="text-xl font-bold text-[#27273F]">R$ {flight.price}</p>
      </div>
    </div>
  );
};

export default FlightDetails;
