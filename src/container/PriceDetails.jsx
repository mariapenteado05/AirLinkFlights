import { hawaiian } from "../assets/logo";

const PriceDetails = () => {
  return (
    <>
      <div className="flex flex-col items-start lg:items-end justify-start lg:justify-end gap-5 w-full h-full sm:w-[400px]">
        {/* Informações dos voos */}
        <div className="w-full border-[1px] border-[#E9E8FC] rounded-lg flex flex-col gap-2">
          {/* Voo de ida */}
          <div className="flex items-start justify-between w-full p-3">
            <div className="flex items-start justify-start gap-2">
              <img
                src={hawaiian}
                alt="hawaiian"
                className="w-6 h-6 sm:w-9 sm:h-9 object-contain"
              />
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-[#27273F] font-normal text-sm sm:text-base">
                  Hawaiian Airlines
                </h1>
                <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                  FIG4312
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
                16h 45min (+1 dia)
              </p>
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
                07:00 - 16:15
              </p>
              <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                2h 45min em HNL
              </p>
            </div>
          </div>

          {/* Voo de volta */}
          <div className="flex items-start justify-between w-full border-t-[1px] border-[#E9E8FC] px-3 py-4">
            <div className="flex items-start justify-start gap-2">
              <img
                src={hawaiian}
                alt="hawaiian"
                className="w-6 h-6 sm:w-9 sm:h-9 object-contain"
              />
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-[#27273F] font-normal text-sm sm:text-base">
                  Hawaiian Airlines
                </h1>
                <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                  FIG4312
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
                16h 45min (+1 dia)
              </p>
              <p className="text-[#27273F] font-normal text-sm sm:text-base">
                07:00 - 16:15
              </p>
              <p className="text-[#7C8DB0] font-normal text-sm sm:text-base">
                2h 45min em HNL
              </p>
            </div>
          </div>
        </div>

        {/* Totais */}
        <div className="flex flex-col gap-3 p-3 w-[231px]">
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Subtotal</p>
            <p>R$ 503</p>
          </div>
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base">
            <p>Taxas e Impostos</p>
            <p>R$ 121</p>
          </div>
          <div className="w-full flex items-center justify-between text-[#27273F] text-sm sm:text-base font-semibold">
            <p>Total</p>
            <p>R$ 624</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceDetails;
