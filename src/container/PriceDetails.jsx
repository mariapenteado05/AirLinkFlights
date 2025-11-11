import { hawaiian } from "../assets/logo";

export const PriceDetails = ({ flight, passengers = [], selectedSeats = [] }) => {
  if (!flight || passengers.length === 0) return null;

  const ticketPrice = flight.price || 1299.99;
  const subtotal = ticketPrice * passengers.length;
  const taxes = 121; // você pode tornar dinâmico se quiser
  const total = subtotal + taxes;

  return (
    <div className="flex flex-col items-start lg:items-end justify-start lg:justify-end gap-5 w-full h-full sm:w-[400px]">
      {/* Informações do voo */}
      <div className="w-full border-[1px] border-[#E9E8FC] rounded-lg flex flex-col gap-2">
        <div className="flex items-start justify-between w-full p-3">
          <div className="flex items-start justify-start gap-2">
            <img src={hawaiian} alt="airline" className="w-6 h-6 sm:w-9 sm:h-9 object-contain" />
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-[#27273F] font-normal text-sm sm:text-base">{flight.airline}</h1>
              <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">{flight.code}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-[#27273F] font-normal text-sm sm:text-base">{flight.duration}</p>
            <p className="text-[#27273F] font-normal text-sm sm:text-base">{flight.departure} - {flight.arrival}</p>
          </div>
        </div>
      </div>

      {/* Passageiros e assentos */}
      <div className="w-full border-[1px] border-[#E9E8FC] rounded-lg p-3 flex flex-col gap-2">
        <h2 className="text-[#6E7491] font-semibold text-sm sm:text-base">Passageiros</h2>
        {passengers.map((p, i) => (
          <p key={i} className="text-[#27273F] text-sm sm:text-base">
            {p.firstName} {p.lastName} - Assento: <span className="font-semibold text-[#605DEC]">{selectedSeats[i]}</span>
          </p>
        ))}
      </div>

      {/* Totais */}
      <div className="flex flex-col gap-3 p-3 w-[231px]">
        <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
          <p>Subtotal</p>
          <p>R$ {subtotal.toFixed(2)}</p>
        </div>
        <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
          <p>Taxas e Impostos</p>
          <p>R$ {taxes.toFixed(2)}</p>
        </div>
        <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base font-semibold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
export default PriceDetails