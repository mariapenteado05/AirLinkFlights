import { useState } from "react";
import { map } from "../assets/images";
import { hawaiian, united } from "../assets/logo";
import { FlightCard, PriceDetails } from "../container";
import { Link } from "react-router-dom";

const FlightChoose = () => {
  const [priceShown, setPriceShow] = useState(true);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 px-6 lg:px-20 mt-10">
        <div className="w-full lg:w-[872px] flex flex-col gap-6 items-center justify-center">
          {/* Título */}
          <div className="flex items-center justify-center w-full">
            <h1 className="text-[#6E7491] text-lg lg:text-xl leading-6 font-semibold text-center">
              Escolha um voo de{" "}
              <span className="text-[#605DEC]">ida </span>/{" "}
              <span className="text-[#605DEC]">volta</span>
            </h1>
          </div>

          {/* Lista de voos */}
          <div className="w-full flex flex-col items-center justify-center border-[1px] border-[#E9E8FC] rounded-xl shadow-sm">
            <div
              className="w-full cursor-pointer border-b border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={hawaiian}
                duration="16h 45min"
                name="Hawaiian Airlines"
                time="7:00 - 16:15"
                stop="1 parada"
                hnl="2h 45min em HNL"
                price="R$ 624"
                trip="ida e volta"
              />
            </div>

            <div
              className="w-full cursor-pointer border-b border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={united}
                duration="18h 22min"
                name="United Airlines"
                time="7:35 - 12:15"
                stop="1 parada"
                hnl="50min em HKG"
                price="R$ 663"
                trip="ida e volta"
              />
            </div>

            <div
              className="w-full cursor-pointer border-b border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={united}
                duration="18h 52min"
                name="United Airlines"
                time="9:47 - 16:15"
                stop="1 parada"
                hnl="4h 05min em ICN"
                price="R$ 756"
                trip="ida e volta"
              />
            </div>

            <div
              className="w-full cursor-pointer border-b border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={hawaiian}
                duration="15h 45min"
                name="Hawaiian Airlines"
                time="10:55 - 20:15"
                stop="Sem paradas"
                price="R$ 839"
                trip="ida e volta"
              />
            </div>

            <div
              className="w-full cursor-pointer border-b border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={united}
                duration="16h 05min"
                name="United Airlines"
                time="11:15 - 19:45"
                stop="Sem paradas"
                price="R$ 837"
                trip="ida e volta"
              />
            </div>

            <div
              className="w-full cursor-pointer hover:bg-[#F6F6FE] transition-all duration-300"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={hawaiian}
                duration="18h 30min"
                name="Hawaiian Airlines"
                time="10:15 - 20:45"
                stop="Sem paradas"
                price="R$ 964"
                trip="ida e volta"
              />
            </div>
          </div>

          {/* Mapa */}
          <div className="w-full lg:mt-12">
            <img
              src={map}
              alt="mapa"
              className="w-full h-full object-cover rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Lado direito - Detalhes do preço */}
        {!priceShown && (
          <div className="flex flex-col gap-10 justify-center items-center lg:items-end mt-10 lg:mt-0 w-full lg:w-[350px]">
            <PriceDetails />
            <Link to="/passenger-info" className="mt-5">
              <button className="text-[#605DEC] border-2 border-[#605DEC] py-2 px-4 rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
                Salvar e continuar
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightChoose;
