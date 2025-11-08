import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FlightCard } from "../container";
import { hawaiian } from "../assets/logo";

const Confirm = () => {
  const [close, setClose] = useState(true);
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = () => {
    setCancelled(true);
  };

  return (
    <>
      <div className="px-8 w-full h-full flex lg:flex-row flex-col justify-between items-start mt-20 gap-10">
        <div className="w-full lg:w-[756px] flex flex-col items-start gap-16">

          {/* ✅ Alerta de sucesso */}
          {close && !cancelled && (
            <div className="w-full lg:w-[704px] h-[64px] border-2 border-[#007B65] bg-[#EAFFFB] rounded p-2 hidden md:flex items-center justify-center">
              <p className="w-full h-full flex items-center justify-start text-[#007B65] text-xs sm:text-base">
                Sua compra foi confirmada com sucesso! Seu Número de Reserva é #381029404387
              </p>
              <MdOutlineClose
                className="text-[#52527A] font-medium cursor-pointer"
                onClick={() => setClose(false)}
              />
            </div>
          )}

          {/* ❌ Alerta de cancelamento — mesmo layout, cores diferentes */}
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

          {/* Conteúdo principal — aparece apenas se não estiver cancelado */}
          {!cancelled && (
            <>
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <h1 className="titleh1">Boa viagem, Safadão!</h1>
                <p className="text-[#6E7491] text-base sm:text-lg font-semibold">
                  Número de Reserva: #381029404387
                </p>
                <p className="text-[#7C8DB0] text-sm sm:text-base font-medium">
                  Obrigado por escolher voar com AirLink!
                </p>
              </div>

              <div className="w-full flex flex-col items-start justify-start gap-4">
                <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">Resumo da compra</h1>
                <div className="w-full cursor-pointer border-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300">
                  <FlightCard
                    img={hawaiian}
                    duration="16h 45m"
                    name="Hawaiian Airlines"
                    time="7:00AM - 4:15PM"
                    stop="1 stop"
                    hnl="2h 45m in HNL"
                    price="$624"
                    trip="round trip"
                  />
                </div>
              </div>

              <div className="w-full h-full flex flex-col items-start justify-start gap-5">
                <h1 className="text-[#6E7491] text-xl sm:text-2xl font-bold">
                  Método de pagamento
                </h1>
                <p className="text-[#605DEC] text-lg font-semibold">
                  Cartão de Crédito (Visa)
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
    </>
  );
};

export default Confirm;
