import { useState } from "react";
import { Link } from "react-router-dom";
import { plane2 } from "../assets/images";

const SeatSelect = () => {
  // Criando fileiras (1 a 19)
  const totalRows = 19;
  const seatRows = Array.from({ length: totalRows }, (_, i) => i + 1);

  // Define quais letras de assento cada fileira tem
  const getSeatCols = (row) => {
    return row <= 2 ? ["A", "B", "C", "D"] : ["A", "B", "C", "D", "E", "F"];
  };

  const [selectedSeat, setSelectedSeat] = useState(null);

  // Função para selecionar/desmarcar assento
  const handleSeatClick = (seat) => {
    setSelectedSeat((prevSeat) => (prevSeat === seat ? null : seat));
  };

  return (
    <div className="px-4 sm:px-8 w-full h-full flex flex-col lg:flex-row justify-between items-start gap-10 mt-20">
      {/* Imagem lateral (avião) */}
      <div className="relative w-full h-full mx-auto lg:mx-0 sm:w-[400px] sm:h-[850px]">
        <img src={plane2} alt="avião" className="w-full h-full object-contain" />
      </div>

      {/* Painel de seleção */}
      <div className="w-full h-full md:w-[712px] md:h-[850px] bg-white bg-opacity-20 flex flex-col mt-5 gap-10 border-[1px] border-[#f2f0f0] justify-between">
        {/* Cabeçalho da viagem */}
        <div className="w-full h-20 flex justify-between items-center bg-[#27273F]">
          <div className="h-full w-full flex flex-col items-start justify-center px-4">
            <h1 className="text-[#FAFAFA] text-base md:text-xl font-bold">SFO</h1>
            <p className="text-[#E9E8FC] text-xs">Califórnia, EUA</p>
          </div>
          <div className="h-full w-full flex flex-col items-start justify-center px-4">
            <h1 className="text-[#FAFAFA] text-base md:text-xl font-bold">NRT</h1>
            <p className="text-[#E9E8FC] text-xs">Tóquio, Japão</p>
          </div>
          <div className="h-full w-full flex flex-col items-start justify-center px-4 hover:bg-[#605DEC] transition-all duration-200">
            <h1 className="text-[#FAFAFA] text-xs sm:text-sm md:text-base font-normal">
              25 Fev | 7:00
            </h1>
            <p className="text-[#E9E8FC] text-xs">Partida</p>
          </div>
          <div className="h-full w-full flex flex-col items-start justify-center px-4 hover:bg-[#605DEC] transition-all duration-200">
            <h1 className="text-[#FAFAFA] text-xs sm:text-sm md:text-base font-normal">
              21 Mar | 12:15
            </h1>
            <p className="text-[#E9E8FC] text-xs">Chegada</p>
          </div>
        </div>

        {/* Mapa de assentos */}
        <div className="flex flex-col items-center justify-start w-full gap-3 mt-5 p-2">
          <h2 className="text-[#6E7491] text-xl font-semibold mb-2">
            Selecione seu assento
          </h2>

          {/* Container com rolagem independente */}
          <div className="w-full max-w-[600px] bg-gray-100 rounded-lg shadow-inner p-4 overflow-y-auto max-h-[600px]">
            {seatRows.map((row) => (
              <div
                key={row}
                className="flex justify-center items-center gap-2 flex-wrap mb-2"
              >
                {getSeatCols(row).map((col) => {
                  const seat = `${row}${col}`;
                  const isSelected = seat === selectedSeat;
                  const isUnavailable = Math.random() < 0.08; // 8% dos assentos indisponíveis

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

          {/* Texto do assento selecionado */}
          <p className="text-[#7C8DB0] text-sm mt-3">
            {selectedSeat ? (
              <>
                Assento selecionado:{" "}
                <span className="text-[#605DEC] font-semibold">{selectedSeat}</span>
              </>
            ) : (
              "Nenhum assento selecionado"
            )}
          </p>
        </div>

        {/* Rodapé */}
        <div className="w-full h-[93px] border-t border-[#f2f0f0] flex justify-between items-center px-4 gap-3">
          <div className="flex flex-col items-start gap-1">
            <p className="text-[#7C8DB0] text-xs sm:text-sm">Passageiro 1</p>
            <h1 className="text-[#6E7491] text-sm sm:text-xl">Wesley Safadão</h1>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[#7C8DB0] text-xs sm:text-sm">Número do assento</p>
            <h1 className="text-[#6E7491] text-sm sm:text-xl">
              {selectedSeat || "—"}
            </h1>
          </div>
          <div className="flex flex-row items-center gap-3">
            <button
              disabled={!selectedSeat}
              className={`hidden sm:block border-[1px] p-2 sm:px-3 sm:py-2 rounded text-xs sm:text-base transition-all duration-200
              ${
                selectedSeat
                  ? "text-[#605DEC] border-[#605DEC] hover:bg-[#605DEC] hover:text-white"
                  : "text-gray-400 border-gray-300 cursor-not-allowed"
              }`}
            >
              Salvar e Fechar
            </button>
            <Link to={selectedSeat ? "/payment" : "#"}>
              <button
                disabled={!selectedSeat}
                className={`border-[1px] p-2 sm:px-3 sm:py-2 rounded text-xs sm:text-base transition-all duration-200
                ${
                  selectedSeat
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
    </div>
  );
};

export default SeatSelect;
