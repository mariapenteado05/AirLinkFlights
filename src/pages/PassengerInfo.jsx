// src/pages/PassengerInfo.jsx
import { useEffect, useState } from "react";
import FlightDetails from "../components/FlightDetails";
import { Link } from "react-router-dom";

const PassengerInfo = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [numPassengers, setNumPassengers] = useState(1);
  const [passengers, setPassengers] = useState([]);
  const [sameAsFirst, setSameAsFirst] = useState(false);

  // 🔹 Lê voo e número de passageiros do localStorage
  useEffect(() => {
    try {
      const savedFlight = JSON.parse(localStorage.getItem("selectedFlight"));
      const savedSearch = JSON.parse(localStorage.getItem("flightSearch"));

      if (savedFlight) setSelectedFlight(savedFlight);
      if (savedSearch?.passengers) setNumPassengers(savedSearch.passengers);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  }, []);

  // 🔹 Cria estrutura de passageiros com base na quantidade
  useEffect(() => {
    const initial = Array.from({ length: numPassengers }, () => ({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    }));
    setPassengers(initial);
  }, [numPassengers]);

  // 🔹 Atualiza campos
  const handleInputChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };


  // 🔹 Verifica se todos os campos obrigatórios estão preenchidos
  const allFilled = passengers.every(
    (p) =>
      p.firstName.trim() &&
      p.lastName.trim() &&
      p.email.trim() &&
      p.phoneNumber.trim()
  );

  return (
    <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
      {/* Coluna esquerda — formulário de passageiros */}
      <div className="w-full lg:w-[682px] flex flex-col items-start gap-10">
        <div className="flex flex-col items-start gap-2 w-full">
          <h1 className="titleh1">Informações dos Passageiros</h1>
          <p className="text-[#7C8DB0] text-base font-normal">
            Insira os dados pessoais de cada passageiro.
          </p>
        </div>

        {passengers.map((passenger, index) => (
          <div key={index} className="flex flex-col items-start w-full gap-4">
            <h2 className="text-[#6E7491] text-lg font-medium">
              Passageiro {index + 1}
            </h2>

            <form className="flex flex-col w-full md:flex-row items-center justify-start gap-4 mt-4">
              <input
                type="text"
                placeholder="Nome*"
                className="w-full border border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
                value={passenger.firstName}
                onChange={(e) =>
                  handleInputChange(index, "firstName", e.target.value)
                }
                disabled={sameAsFirst && index > 0}
              />
              <input
                type="text"
                placeholder="Sobrenome*"
                className="w-full border border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
                value={passenger.lastName}
                onChange={(e) =>
                  handleInputChange(index, "lastName", e.target.value)
                }
                disabled={sameAsFirst && index > 0}
              />
            </form>

            <form className="flex flex-col w-full md:flex-row items-center justify-start gap-4 mt-2">
              <input
                type="email"
                placeholder="E-mail*"
                className="w-full border border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
                value={passenger.email}
                onChange={(e) =>
                  handleInputChange(index, "email", e.target.value)
                }
                disabled={sameAsFirst && index > 0}
              />
              <input
                type="text"
                placeholder="Telefone*"
                className="w-full border border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
                value={passenger.phoneNumber}
                onChange={(e) =>
                  handleInputChange(index, "phoneNumber", e.target.value)
                }
                disabled={sameAsFirst && index > 0}
              />
            </form>

          </div>
        ))}

        {/* Botão desabilitado até todos os campos estarem preenchidos */}
        <div className="flex items-center gap-5 mt-5">
          <Link
            to={allFilled ? "/seat-selection" : "#"}
            state={{ 
              passengers: passengers.map(p => `${p.firstName} ${p.lastName}`),
              flight: selectedFlight  // <<< adiciona isso
            }}
          >
            <button
              disabled={!allFilled}
              className={`py-2 px-4 border border-[#7C8DB0] rounded transition-all duration-200 ${
                allFilled
                  ? "text-[#7C8DB0] bg-[#CBD4E6] hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Selecionar assentos
            </button>
          </Link>
        </div>
      </div>

      {/* Coluna direita — detalhes da passagem */}
      <div className="w-full h-full sm:w-[400px] flex flex-col justify-start items-center mt-10">
        {selectedFlight ? (
          <FlightDetails flight={selectedFlight} />
        ) : (
          <p className="text-[#7C8DB0]">Nenhum voo selecionado.</p>
        )}
      </div>
    </div>
  );
};

export default PassengerInfo;
