import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { departure, arrival, calendar, person } from "../assets/icons";
import { suggestions } from "../data/constant";

/** Hook de sugestões automáticas **/
const useAutoSuggest = () => {
  const [input, setInput] = useState("");
  const [matchingSuggestions, setMatchingSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setInput(value);
    const filtered = suggestions.filter((s) =>
      s.toLowerCase().includes(value)
    );
    setMatchingSuggestions(filtered);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setIsOpen(false);
  };

  return {
    input,
    isOpen,
    matchingSuggestions,
    setIsOpen,
    handleInputChange,
    handleSuggestionClick,
  };
};

/** Barra de busca **/
const FlightSearchBar = () => {
  const navigate = useNavigate();

  const departureSuggest = useAutoSuggest();
  const arrivalSuggest = useAutoSuggest();
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(null); // ❗ Agora começa como null
  const [openOptions, setOpenOptions] = useState(false);
  const [tickets, setTickets] = useState(1);

  const handleTickets = (op) => {
    setTickets((prev) =>
      op === "i" ? Math.min(prev + 1, 5) : Math.max(prev - 1, 1)
    );
  };

  /** 🔍 Função para enviar a busca **/
  const handleSearch = () => {
    const formattedDate = date ? format(date, "dd-MM-yyyy") : ""; // Se não tiver data, fica vazio

    const searchData = {
      origin: departureSuggest.input.trim(),
      destination: arrivalSuggest.input.trim(),
      date: formattedDate || null,
      passengers: tickets,
    };

    localStorage.setItem("flightSearch", JSON.stringify(searchData));
    navigate("/explore");
  };

  return (
    <div className="flex w-full max-w-[1024px] lg:h-[65px] lg:flex-row items-center flex-col mt-10 shadowCard relative">
      {/* Origem */}
      <div className="relative flex w-full h-full justify-start items-center border border-[#CBD4E6] p-2 lg:rounded-l-[4px] overflow-visible">
        <img src={departure} alt="departure" />
        <input
          type="text"
          placeholder="Origem"
          value={departureSuggest.input}
          onChange={departureSuggest.handleInputChange}
          onFocus={() => departureSuggest.setIsOpen(true)}
          className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] w-full"
        />
        {departureSuggest.isOpen &&
          departureSuggest.matchingSuggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded mt-1 max-h-48 overflow-y-auto z-50 shadow-md">
              {departureSuggest.matchingSuggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => departureSuggest.handleSuggestionClick(s)}
                  className="px-3 py-2 cursor-pointer hover:bg-[#605DEC] hover:text-white text-[#7C8DB0] text-sm truncate"
                  title={s}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
      </div>

      {/* Destino */}
      <div className="relative flex w-full h-full justify-start items-center border border-[#CBD4E6] p-2 overflow-visible">
        <img src={arrival} alt="arrival" />
        <input
          type="text"
          placeholder="Destino"
          value={arrivalSuggest.input}
          onChange={arrivalSuggest.handleInputChange}
          onFocus={() => arrivalSuggest.setIsOpen(true)}
          className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0] w-full"
        />
        {arrivalSuggest.isOpen &&
          arrivalSuggest.matchingSuggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded mt-1 max-h-48 overflow-y-auto z-50 shadow-md">
              {arrivalSuggest.matchingSuggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => arrivalSuggest.handleSuggestionClick(s)}
                  className="px-3 py-2 cursor-pointer hover:bg-[#605DEC] hover:text-white text-[#7C8DB0] text-sm truncate"
                  title={s}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
      </div>

      {/* Data */}
      <div className="relative flex w-full h-full justify-start items-center border border-[#CBD4E6] p-2">
        <img src={calendar} alt="calendar" />
        <span
          className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
          onClick={() => setOpenDate(!openDate)}
        >
          {date ? format(date, "dd-MM-yyyy") : "Sem data definida"}
        </span>

        {openDate && (
          <div className="absolute top-full mt-2 z-50 bg-white p-2 rounded shadow-md">
            <Calendar date={date || new Date()} onChange={setDate} color="#605DEC" />
            <button
              className="mt-2 text-sm text-[#605DEC] underline w-full text-center"
              onClick={() => {
                setDate(null);
                setOpenDate(false);
              }}
            >
              Remover data
            </button>
          </div>
        )}
      </div>

      {/* Passageiros */}
      <div className="relative flex w-full h-full justify-start items-center border border-[#CBD4E6] p-2">
        <img src={person} alt="person" />
        <span
          className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
          onClick={() => setOpenOptions(!openOptions)}
        >
          {tickets === 1 ? `${tickets} passagem` : `${tickets} passagens`}
        </span>

        {openOptions && (
          <div className="absolute top-full mt-2 w-48 bg-white shadowCard rounded-md p-4 z-50 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-6">
              <button
                className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] rounded disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => handleTickets("d")}
                disabled={tickets <= 1}
              >
                -
              </button>
              <span className="text-[#7C8DB0] text-lg font-medium">{tickets}</span>
              <button
                className="border-2 border-[#605DEC] px-2 text-[#7C8DB0] rounded disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => handleTickets("i")}
                disabled={tickets >= 5}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Botão */}
      <button
        onClick={handleSearch}
        className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[45px] lg:h-[65px] px-5 lg:rounded-r-[4px] hover:bg-[#4b47d1] transition"
      >
        Buscar
      </button>
    </div>
  );
};

export default FlightSearchBar;
