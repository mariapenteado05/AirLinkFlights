// src/pages/SelectDetails.jsx
import FlightSearchBar from "../components/FlightSearchBar";

const SelectDetails = () => {
  return (
    <div className="w-full flex flex-col items-center mt-10">
      {/* Barra de busca de voos (mesmo componente usado no Hero) */}
      <FlightSearchBar showLink={false} />

      {/* Seção de filtros adicionais */}
      <div className="flex flex-wrap items-center justify-start gap-3 mt-10 lg:mt-6">
        <select
          name="price"
          id="max-price"
          className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-2 cursor-pointer rounded-md"
        >
          <option value="max-price">Faixa de preço</option>
          <option value="$100-300">R$100 - R$300</option>
          <option value="$300-600">R$300 - R$600</option>
          <option value="$600-1000">R$600 - R$1000</option>
        </select>

        <select
          name="times"
          id="times"
          className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-2 cursor-pointer rounded-md"
        >
          <option value="times">Horários de Partida</option>
          <option value="7 AM - 4 PM">Manhã</option>
          <option value="8 AM - 12 PM">Tarde</option>
          <option value="6 PM - 10 PM">Noite</option>
        </select>

        <select
          name="airlines"
          id="airlines"
          className="border-[1px] border-[#CBD4E6] bg-white text-[#27273F] p-2 cursor-pointer rounded-md"
        >
          <option value="airlines">Companhias</option>
          <option value="Hawaiian Airlines">Hawaiian Airlines</option>
          <option value="Emirates">United Airlines</option>
        </select>
      </div>
    </div>
  );
};

export default SelectDetails;
