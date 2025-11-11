const FlightCard = ({
  img,
  duration,
  name,
  time,
  stop,
  trip,
  price,
  hnl,
  origin,
  destination,
  seat, // novo campo
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded hover:bg-[#F6F6FE] transition-all duration-300">
      
      {/* Companhia e duração */}
      <div className="flex items-start gap-2">
        <img src={img} alt={name} className="w-6 h-6 sm:w-9 sm:h-9 object-contain" />
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-[#27273F] font-normal text-xs md:text-base">{duration}</h2>
          <p className="text-[#7C8DB0] font-normal text-xs md:text-base">{name}</p>
        </div>
      </div>

      {/* Origem → Destino + Horário */}
      <div className="flex flex-col items-start justify-start">
        <p className="text-[#605DEC] font-semibold text-xs md:text-sm">
          {origin} → {destination}
        </p>
        <p className="text-[#27273F] font-normal text-xs md:text-base">{time}</p>
        {seat && (
          <p className="text-[#7C8DB0] font-normal text-xs md:text-base">
            Assento: {seat}
          </p>
        )}
      </div>

      {/* Paradas e conexões */}
      <div className="flex flex-col items-center sm:items-end justify-start">
        <p className="text-[#27273F] font-normal text-xs md:text-base">{stop}</p>
        {hnl && (
          <p className="text-[#7C8DB0] font-normal text-xs md:text-base">{hnl}</p>
        )}
      </div>

      {/* Preço e tipo de viagem */}
      <div className="flex flex-col items-center sm:items-end justify-start">
        <p className="text-[#27273F] font-normal text-xs md:text-base">
          R$ {price}
        </p>
        <p className="text-[#7C8DB0] font-normal text-xs md:text-base">{trip}</p>
      </div>
    </div>
  );
};

export default FlightCard;
