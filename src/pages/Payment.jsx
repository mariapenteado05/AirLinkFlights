import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineCreditCard } from "react-icons/ai";
import { BsPaypal } from "react-icons/bs";
import { toast } from "react-toastify";
import { CompensationSlip } from "../components/PaymentSlip"; // componente separado

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, totalPassengers, passengers } = location.state || {};

  const ticketPrice = flight?.price || 0;
  const totalPrice = ticketPrice * (totalPassengers || 1);

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardName, setCardName] = useState("");

  const generateReservationNumber = () =>
    `RSV-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleCreditPayment = (e) => {
    e.preventDefault();

    if (!cardType || !cardNumber || !cardDate || !cardName) {
      toast.warning("Por favor, preencha todos os dados do cartão.");
      return;
    }

    const reservationNumber = generateReservationNumber();

    toast.success("Pagamento confirmado com sucesso!");
    navigate("/confirm", {
      state: {
        reservationNumber,
        flight,
        totalPassengers,
        passengers,
        totalPrice,
        paymentMethod: "Cartão de Crédito",
        purchaseStatus: "Confirmada",
      },
    });
  };

  const handleSlipPayment = () => {
    const reservationNumber = generateReservationNumber();

    // Pega o nome do primeiro passageiro
    const passengerName = passengers?.[0] || "Cliente AirLink";

    CompensationSlip({
      reservationNumber,
      totalPrice,
      passengerName,
    });

    toast.success("Ficha gerada com sucesso!");
    navigate("/confirm", {
      state: {
        reservationNumber,
        flight,
        totalPassengers,
        passengers,
        totalPrice,
        paymentMethod: "Ficha de Compensação",
        purchaseStatus: "Em análise",
      },
    });
  };

  return (
    <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
      <div className="w-full lg:w-[686px] flex flex-col items-start gap-10">
        <div className="flex flex-col items-start gap-2 w-full">
          <h1 className="titleh1">Forma de pagamento</h1>
          <p className="text-[#7C8DB0] text-base font-normal">
            Valor total:{" "}
            <span className="font-semibold text-[#605DEC]">
              R$ {totalPrice.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Seleção de forma de pagamento */}
        <div className="w-full flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={() => setPaymentMethod("credit")}
            />
            <AiOutlineCreditCard /> <span>Cartão de crédito</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="slip"
              checked={paymentMethod === "slip"}
              onChange={() => setPaymentMethod("slip")}
            />
            <BsPaypal /> <span>Ficha de compensação</span>
          </label>
        </div>

        {/* Formulário de cartão */}
        {paymentMethod === "credit" && (
          <form
            className="w-full flex flex-col gap-5 mt-5"
            onSubmit={handleCreditPayment}
          >
            <h2 className="text-[#6E7491] text-xl font-semibold">Dados do cartão</h2>
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
              className="border border-[#A1B0CC] rounded px-3 py-2 w-full sm:w-[480px] text-[#6E7491]"
            >
              <option value="">Selecione o tipo de cartão</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Visa">Visa</option>
              <option value="Elo">Elo</option>
              <option value="American Express">American Express</option>
            </select>
            <input
              type="text"
              placeholder="Nome no cartão"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="border border-[#A1B0CC] rounded px-3 py-2 w-full sm:w-[480px]"
            />
            <input
              type="text"
              placeholder="Número do cartão"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border border-[#A1B0CC] rounded px-3 py-2 w-full sm:w-[480px]"
            />
            <input
              type="month"
              placeholder="Data de validade"
              value={cardDate}
              onChange={(e) => setCardDate(e.target.value)}
              className="border border-[#A1B0CC] rounded px-3 py-2 w-full sm:w-[240px]"
            />

            <button
              type="submit"
              className="mt-4 bg-[#605DEC] text-white px-5 py-2 rounded hover:bg-[#4B48C6] transition-all duration-200"
            >
              Confirmar e pagar
            </button>
          </form>
        )}

        {/* Ficha de compensação */}
        {paymentMethod === "slip" && (
          <div className="flex flex-col gap-4 mt-5">
            <p className="text-[#7C8DB0]">
              Clique abaixo para gerar a ficha de compensação. Apresente-a em um
              banco conveniado para efetuar o pagamento.
            </p>
            <button
              onClick={handleSlipPayment}
              className="bg-[#605DEC] text-white px-5 py-2 rounded hover:bg-[#4B48C6] transition-all duration-200"
            >
              Imprimir ficha de compensação
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
