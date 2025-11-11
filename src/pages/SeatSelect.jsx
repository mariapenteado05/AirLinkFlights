import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { plane2 } from "../assets/images";

const SeatSelect = () => {
  const location = useLocation();
  const { passengers } = location.state || { passengers: [] };
  const totalSeatsToSelect = passengers.length;

  const totalRows = 19;
  const seatRows = Array.from({ length: totalRows }, (_, i) => i + 1);
  const getSeatCols = (row) => (row <= 2 ? ["A", "B", "C", "D"] : ["A", "B", "C", "D", "E", "F"]);

  // 🔹 Assentos ocupados fixos
  const occupiedSeats = ["1A", "1B", "2C", "5D", "6F", "10A", "12C", "15E"];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      } else if (prev.length < totalSeatsToSelect) {
        return [...prev, seat];
      } else {
        return prev; // não permite selecionar mais do que o permitido
      }
    });
  };

  return (
    <div className="px-4 sm:px-8 w-full h-full flex flex-col lg:flex-row justify-between items-start gap-10 mt-20">
      <div className="relative w-full h-full mx-auto lg:mx-0 sm:w-[400px] sm:h-[850px]">
        <img src={plane2} alt="avião" className="w-full h-full object-contain" />
      </div>

      <div className="w-full h-full md:w-[712px] md:h-[850px] bg-white bg-opacity-20 flex flex-col mt-5 gap-10 border-[1px] border-[#f2f0f0] justify-between">
        
        {/* Mapa de assentos */}
        <div className="flex flex-col items-center justify-start w-full gap-3 mt-5 p-2">
          <h2 className="text-[#6E7491] text-xl font-semibold mb-2">
            Selecione seus assentos ({selectedSeats.length}/{totalSeatsToSelect})
          </h2>

          <div className="w-full max-w-[600px] bg-gray-100 rounded-lg shadow-inner p-4 overflow-y-auto max-h-[600px]">
            {seatRows.map((row) => (
              <div key={row} className="flex justify-center items-center gap-2 flex-wrap mb-2">
                {getSeatCols(row).map((col) => {
                  const seat = `${row}${col}`;
                  const isSelected = selectedSeats.includes(seat);
                  const isUnavailable = occupiedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={isUnavailable}
                      onClick={() => handleSeatClick(seat)}
                      className={`w-10 h-10 rounded text-sm font-semibold border transition-all duration-200
                        ${
                          isUnavailable
                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                            : isSelected
                            ? "bg-[#605DEC] text-white border-[#605DEC]"
                            : "bg-white text-[#6E7491] border-[#A1B0CC] hover:bg-[#E9E8FC]"
                        }`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Mostra assentos selecionados e passageiros */}
          <div className="mt-3 text-[#7C8DB0] text-sm">
            {selectedSeats.map((seat, idx) => (
              <p key={seat}>
                {passengers[idx]}: <span className="text-[#605DEC] font-semibold">{seat}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Rodapé */}
        <div className="w-full h-[93px] border-t border-[#f2f0f0] flex justify-end items-center px-4 gap-3">
          <Link
            to={selectedSeats.length === totalSeatsToSelect ? "/payment" : "#"}
            state={{ 
              selectedSeats,
              passengers,
              flight: location.state?.flight || null,  // pega o voo
              totalPassengers: totalSeatsToSelect
            }}
          >
            <button
              disabled={selectedSeats.length !== totalSeatsToSelect}
              className={`border-[1px] p-2 sm:px-3 sm:py-2 rounded text-xs sm:text-base transition-all duration-200
                ${
                  selectedSeats.length === totalSeatsToSelect
                    ? "bg-[#605DEC] text-white border-[#605DEC] hover:bg-white hover:text-[#605DEC]"
                    : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
            >
              Pagamento
            </button>
          </Link>
              
        </div>
      </div>
    </div>
  );
};

export default SeatSelect;
