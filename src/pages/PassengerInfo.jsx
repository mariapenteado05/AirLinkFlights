import { Link } from "react-router-dom";
import { useState } from "react";
import { PriceDetails } from "../container";

const PassengerInfo = () => {
  const [sameAsPassenger, setSameAsPassenger] = useState(false);

  // Dados do passageiro principal
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Dados do segundo passageiro
  const [emergencyFirstName, setEmergencyFirstName] = useState("");
  const [emergencyLastName, setEmergencyLastName] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] = useState("");

  // Checkbox: copiar dados do passageiro 1
  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAsPassenger(checked);

    if (checked) {
      setEmergencyFirstName(firstName);
      setEmergencyLastName(lastName);
      setEmergencyPhoneNumber(phoneNumber);
      setEmergencyEmail(email);
    } else {
      setEmergencyFirstName("");
      setEmergencyLastName("");
      setEmergencyPhoneNumber("");
      setEmergencyEmail("");
    }
  };

  return (
    <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
      {/* Coluna esquerda - Formulário */}
      <div className="w-full lg:w-[682px] flex flex-col items-start gap-10">
        {/* Informações do passageiro */}
        <div className="flex flex-col items-start gap-2 w-full">
          <h1 className="titleh1">Informações do Passageiro</h1>
          <p className="text-[#7C8DB0] text-base font-normal">
            Insira os dados pessoais de cada passageiro.
          </p>
        </div>

        <div className="flex flex-col items-start w-full gap-4">
          <h2 className="text-[#6E7491] text-lg font-medium">Passageiro 1</h2>
          <form className="flex flex-col w-full md:flex-row items-center justify-start gap-4 mt-4">
            <input
              type="text"
              placeholder="Nome*"
              className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sobrenome*"
              className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </form>

          <form className="flex flex-col w-full md:flex-row items-center justify-start gap-4 mt-2">
            <input
              type="email"
              placeholder="E-mail*"
              className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Telefone*"
              className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </form>

          <div className="flex items-center justify-start gap-2 mt-2">
            <input
              type="checkbox"
              id="checkbox"
              checked={sameAsPassenger}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox" className="text-[#6E7491] font-normal">
              Mesmo que o Passageiro 1
            </label>
          </div>
        </div>

        {/* Passageiro 2 */}
        <div className="flex flex-col items-start w-full gap-4">
          <h2 className="text-[#6E7491] text-lg font-medium">Passageiro 2</h2>

          <form className="flex flex-col w-full md:flex-row items-center justify-start gap-4 mt-4">
            <input
              type="text"
              placeholder="Nome*"
              className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
              value={emergencyFirstName}
              onChange={(e) => setEmergencyFirstName(e.target.value)}
              disabled={sameAsPassenger}
            />
            <input
              type="text"
              placeholder="Sobrenome*"
              className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
              value={emergencyLastName}
              onChange={(e) => setEmergencyLastName(e.target.value)}
              disabled={sameAsPassenger}
            />
          </form>

          <form className="flex flex-col w-full md:flex-row items-center justify-start gap-4 mt-2">
            <input
              type="email"
              placeholder="E-mail*"
              className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
              value={emergencyEmail}
              onChange={(e) => setEmergencyEmail(e.target.value)}
              disabled={sameAsPassenger}
            />
            <input
              type="text"
              placeholder="Telefone*"
              className="w-full border-[1px] border-[#A1B0CC] outline-none px-2 py-3 text-[#7C8DB0] rounded"
              value={emergencyPhoneNumber}
              onChange={(e) => setEmergencyPhoneNumber(e.target.value)}
              disabled={sameAsPassenger}
            />
          </form>
        </div>

        {/* Botões */}
        <div className="flex items-center gap-5 mt-5">
          <button className="py-2 px-4 border-[1px] border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
            Salvar e Fechar
          </button>
          <Link to="/seat-selection">
            <button className="hidden lg:block py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200">
              Selecionar assentos
            </button>
          </Link>
        </div>
      </div>

      {/* Coluna direita - Detalhes e botão */}
      <div className="w-full h-full sm:w-[400px] flex flex-col justify-between">
        <div className="mt-10 flex flex-col gap-10 justify-end items-start lg:items-end">
          <PriceDetails />
          <Link to="/seat-selection" className="mt-5">
            <button className="py-2 px-4 border-[1px] border-[#7C8DB0] text-[#7C8DB0] bg-[#CBD4E6] rounded hover:bg-[#605DEC] hover:text-white hover:border-[#605DEC] transition-all duration-200">
              Selecionar assentos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
