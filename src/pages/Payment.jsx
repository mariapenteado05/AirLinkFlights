import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCreditCard } from "react-icons/ai";
import { BsPaypal } from "react-icons/bs";
import { toast } from "react-toastify";
import { PriceDetails } from "../container";

const Payment = () => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("credit"); // 'credit' ou 'ficha'
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [reservationNumber, setReservationNumber] = useState(null);

  const totalPrice = 1299.99;

  const generateReservationNumber = () => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `RSV-${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "credit") {
      if (
        !cardType.trim() ||
        !cardName.trim() ||
        !cardNumber.trim() ||
        !cardDate.trim()
      ) {
        toast.warning("Por favor, preencha todos os dados do cartão.");
        return;
      }
    }

    // Gera número de reserva
    const newReservation = generateReservationNumber();
    setReservationNumber(newReservation);

    toast.success("Pagamento confirmado com sucesso!");
    navigate("/confirm", { state: { reservationNumber: newReservation } });
  };

  const handlePrintSlip = () => {
    const newReservation = generateReservationNumber();
    setReservationNumber(newReservation);

    // Abre janela com a ficha de compensação
    const slipWindow = window.open("", "_blank");
    slipWindow.document.write(`
      <html>
        <head><title>Ficha de Compensação</title></head>
        <body style="font-family: Arial; padding: 20px;">
          <h2>Ficha de Compensação - AirLink</h2>
          <p><strong>Valor:</strong> R$ ${totalPrice.toFixed(2)}</p>
          <p><strong>Nome do passageiro:</strong> ${cardName || "Cliente AirLink"}</p>
          <p><strong>Número da reserva:</strong> ${newReservation}</p>
          <p><strong>Banco conveniado:</strong> Banco AirLink 123</p>
          <p><strong>Vencimento:</strong> ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          <hr/>
          <p>Apresente esta ficha em um banco conveniado para efetuar o pagamento.</p>
        </body>
      </html>
    `);
    slipWindow.print();

    toast.success("Ficha gerada com sucesso!");
    navigate("/confirm", { state: { reservationNumber: newReservation } });
  };

  return (
    <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
      <div className="w-full lg:w-[686px] flex flex-col items-start gap-10">
        {/* Título */}
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
              value="ficha"
              checked={paymentMethod === "ficha"}
              onChange={() => setPaymentMethod("ficha")}
            />
            <BsPaypal /> <span>Ficha de compensação</span>
          </label>
        </div>

        {/* Formulário de cartão */}
        {paymentMethod === "credit" && (
          <form
            className="w-full flex flex-col gap-5 mt-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-[#6E7491] text-xl font-semibold">
              Dados do cartão
            </h2>
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
        {paymentMethod === "ficha" && (
          <div className="flex flex-col gap-4 mt-5">
            <p className="text-[#7C8DB0]">
              Clique abaixo para gerar a ficha de compensação. Apresente-a em um
              banco conveniado para efetuar o pagamento.
            </p>
            <button
              onClick={handlePrintSlip}
              className="bg-[#605DEC] text-white px-5 py-2 rounded hover:bg-[#4B48C6] transition-all duration-200"
            >
              Imprimir ficha de compensação
            </button>
          </div>
        )}

        {/* Voltar */}
        <div className="flex items-center gap-5 mt-10">
          <Link to="/seat-selection">
            <button className="py-2 px-4 border border-[#605DEC] text-[#605DEC] rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
              Voltar à seleção de assentos
            </button>
          </Link>
        </div>
      </div>

      {/* Painel lateral */}
      <div className="mt-10 flex flex-col gap-10 justify-end items-start lg:items-end">
        <PriceDetails />
      </div>
    </div>
  );
};

export default Payment;
