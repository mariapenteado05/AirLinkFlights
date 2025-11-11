import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { FlightCard } from "../container";
import { hawaiian } from "../assets/logo";

const Confirm = () => {
  const location = useLocation();
  const {
    reservationNumber,
    totalPrice,
    totalPassengers,
    passengers,
    flight,
    paymentMethod,
    isPending,
  } = location.state || {};

  const [close, setClose] = useState(true);
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = () => setCancelled(true);

  // Pega o nome do primeiro passageiro
  const firstPassengerName = passengers?.[0] || "Cliente AirLink";

  // Status da compra
  const purchaseStatus =
    paymentMethod === "Ficha de Compensação" ? "Em análise" : "Confirmada";
  const statusColor =
    paymentMethod === "Ficha de Compensação" ? "#F7B500" : "#007B65";

  return (
    <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
      <div className="w-full lg:w-[756px] flex flex-col items-start gap-16">
        {/* Status da compra */}
        {close && !cancelled && (
          <div
            className="w-full lg:w-[704px] h-[64px] border-2 rounded p-2 hidden md:flex items-center justify-center"
            style={{ borderColor: statusColor, backgroundColor: `${statusColor}20` }}
          >
            <p className="w-full h-full flex items-center justify-start text-xs sm:text-base" style={{ color: statusColor }}>
              Status da compra: {purchaseStatus}
            </p>
            <MdOutlineClose
              className="text-[#52527A] font-medium cursor-pointer"
              onClick={() => setClose(false)}
            />
          </div>
        )}

        {/* Banner de cancelamento */}
        {cancelled && (
          <div className="w-full lg:w-[704px] h-[64px] border-2 border-[#E63946] bg-[#FFE8E9] rounded p-2 hidden md:flex items-center justify-center">
            <p className="w-full h-full flex items-center justify-start text-[#E63946] text-xs sm:text-base">
              Seu voo foi cancelado com sucesso. Caso tenha dúvidas, entre em contato com o suporte.
            </p>
            <MdOutlineClose
              className="text-[#52527A] font-medium cursor-pointer"
              onClick={() => setCancelled(false)}
            />
          </div>
        )}

        {/* Conteúdo principal */}
        {!cancelled && (
          <>
            {/* Saudação */}
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <h1 className="titleh1">Boa viagem, {firstPassengerName}!</h1>
              <p className="text-[#6E7491] text-base sm:text-lg font-semibold">
                Número de Reserva: <strong>#{reservationNumber}</strong>
              </p>
              <p className="text-[#7C8DB0] text-sm sm:text-base font-medium">
                Obrigado por escolher voar com AirLink!
              </p>
            </div>

            {/* Resumo da compra */}
            <div className="w-full flex flex-col items-start justify-start gap-4">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
                Resumo da compra
              </h1>

              {Array.from({ length: totalPassengers || 1 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300"
                >
                  <FlightCard
                    img={hawaiian}
                    duration={flight?.duration || "16h 45m"}
                    name={flight?.airline || "Hawaiian Airlines"}
                    time={flight?.time || "7:00AM - 4:15PM"}
                    stop={flight?.stop || "1 stop"}
                    hnl={flight?.connection || "2h 45m in HNL"}
                    price={`$${((totalPrice || 0) / (totalPassengers || 1)).toFixed(2)}`}
                    trip={flight?.trip || "round trip"}
                    origin={flight?.origin || "Origem não selecionada"}
                    destination={flight?.destination || "Destino não selecionado"}
                  />
                </div>
              ))}
            </div>

            {/* Método de pagamento */}
            <div className="w-full h-full flex flex-col items-start justify-start gap-5">
              <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
                Método de pagamento
              </h1>
              <p className="text-[#605DEC] text-lg font-semibold">
                {paymentMethod || "Cartão de Crédito"}
              </p>
              <p className="text-[#7C8DB0] text-sm font-medium">
                Valor total: <strong>${totalPrice?.toFixed(2)}</strong>
              </p>
            </div>

            {/* Botão de cancelamento */}
            <div className="mt-8">
              <button
                onClick={handleCancel}
                className="bg-[#E63946] py-3 px-6 rounded-[5px] text-white text-base font-medium hover:bg-[#D62828] transition-all duration-200"
              >
                Cancelar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Confirm;
