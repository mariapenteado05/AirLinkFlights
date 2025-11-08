// src/components/FlightSearchBar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { departure, arrival, calendar, person } from "../assets/icons";
import { suggestions } from "../data/constant";

/** Hook para sugestões automáticas **/
const useAutoSuggest = () => {
  const [input, setInput] = useState("");
  const [matchingSuggestions, setMatchingSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setInput(value);
    const filtered = suggestions.filter((s) =>
      s.toLowerCase().startsWith(value)
    );
    setMatchingSuggestions(filtered);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setIsOpen(false);
  };

  return { input, isOpen, matchingSuggestions, setIsOpen, handleInputChange, handleSuggestionClick };
};

/** Barra de busca de voos reutilizável **/
const FlightSearchBar = ({ showLink = true }) => {
  const departureSuggest = useAutoSuggest();
  const arrivalSuggest = useAutoSuggest();

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
  const [openOptions, setOpenOptions] = useState(false);
  const [tickets, setTickets] = useState(1);

  const handleTickets = (op) => {
    setTickets((prev) => (op === "i" ? Math.min(prev + 1, 5) : Math.max(prev - 1, 1)));
  };

  return (
    <div className="flex w-full max-w-[1024px] lg:h-[65px] lg:flex-row items-center flex-col mt-10 shadowCard relative">
      {/* Origem */}
      <div className="flex w-full h-full justify-start items-center border border-[#CBD4E6] p-2 lg:rounded-l-[4px] relative">
        <img src={departure} alt="departure" />
        <input
          type="text"
          placeholder="Origem"
          value={departureSuggest.input}
          onChange={departureSuggest.handleInputChange}
          onFocus={() => departureSuggest.setIsOpen(true)}
          className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0]"
        />
        {departureSuggest.isOpen && (
          <ul className="w-[220px] h-56 absolute top-[70px] bg-white rounded overflow-scroll">
            {departureSuggest.matchingSuggestions.map((s) => (
              <li
                key={s}
                onClick={() => departureSuggest.handleSuggestionClick(s)}
                className="uppercase cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE] mt-1"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Destino */}
      <div className="flex w-full h-full justify-start items-center border border-[#CBD4E6] p-2 relative">
        <img src={arrival} alt="arrival" />
        <input
          type="text"
          placeholder="Destino"
          value={arrivalSuggest.input}
          onChange={arrivalSuggest.handleInputChange}
          onFocus={() => arrivalSuggest.setIsOpen(true)}
          className="uppercase placeholder:capitalize outline-none border-none ml-2 text-base text-[#7C8DB0]"
        />
        {arrivalSuggest.isOpen && (
          <ul className="w-[220px] h-56 absolute top-[70px] bg-white rounded overflow-scroll">
            {arrivalSuggest.matchingSuggestions.map((s) => (
              <li
                key={s}
                onClick={() => arrivalSuggest.handleSuggestionClick(s)}
                className="uppercase cursor-pointer hover:bg-[#605DEC] px-3 py-1 text-[#7C8DB0] hover:text-[#F6F6FE] mt-1"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Data */}
      <div className="flex w-full h-full justify-start items-center border border-[#CBD4E6] p-2 relative">
        <img src={calendar} alt="calendar" />
        <span
          className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
          onClick={() => setOpenDate(!openDate)}
        >
          {openDate
            ? `${format(date[0].startDate, "dd/MM/yyyy")} a ${format(date[0].endDate, "dd/MM/yyyy")}`
            : "Data de Ida e Volta"}
        </span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="absolute top-64 lg:top-20 z-10"
          />
        )}
      </div>

      {/* Passageiros */}
      <div className="flex w-full h-full justify-start items-center border border-[#CBD4E6] p-2 relative">
        <img src={person} alt="person" />
        <span
          className="text-[#7C8DB0] text-base leading-6 ml-2 cursor-pointer"
          onClick={() => setOpenOptions(!openOptions)}
        >
          {tickets === 1 ? `${tickets} passagem` : `${tickets} passagens`}
        </span>

        {openOptions && (
          <div className="absolute lg:top-[70px] top-64 w-48 bg-white shadowCard rounded-md p-4 z-10 flex flex-col items-center gap-4">
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
      {showLink ? (
        <Link to="/explore" className="w-full">
          <button className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[45px] lg:h-[65px] px-5 lg:rounded-r-[4px] hover:bg-[#4b47d1] transition">
            Buscar
          </button>
        </Link>
      ) : (
        <button className="w-full bg-[#605DEC] text-[#FAFAFA] text-lg leading-6 h-[45px] lg:h-[65px] px-5 lg:rounded-r-[4px] hover:bg-[#4b47d1] transition">
          Buscar
        </button>
      )}
    </div>
  );
};

export default FlightSearchBar;
