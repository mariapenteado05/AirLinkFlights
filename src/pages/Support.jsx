import { Mail, Phone } from "lucide-react"; // ✅ corrigido

const Support = () => {
  return (
    <>
      <div className="px-8 flex flex-col gap-10 mt-10 text-[#3B3B3B]">
        {/* Título */}
        <div className="flex items-start justify-start">
          <p className="text-[#6E7491] font-medium md:font-bold sm:text-base md:text-[24px] md:leading-8">
            Precisa de <span className="text-[#54cdb7]">ajuda?</span>
          </p>
        </div>

        {/* Seção FAQ */}
        <div className="flex flex-col gap-8">
          <h2 className="text-lg md:text-2xl font-semibold text-[#2E3A59]">
            Dúvidas Frequentes
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-[#54cdb7] text-lg">
                Como faço para alterar ou cancelar minha reserva?
              </h3>
              <p className="text-[#6E7491] text-sm md:text-base leading-6">
                Você pode alterar ou cancelar sua reserva acessando a seção “Minhas Reservas” no menu principal. 
                Lá é possível visualizar detalhes da viagem e solicitar alterações diretamente.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#54cdb7] text-lg">
                Quais são as formas de pagamento aceitas?
              </h3>
              <p className="text-[#6E7491] text-sm md:text-base leading-6">
                Aceitamos cartões de crédito (Visa, MasterCard, Elo, Amex) e pagamento via Pix. 
                Em breve também aceitaremos boleto bancário.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#54cdb7] text-lg">
                Não recebi a confirmação do meu pedido. O que fazer?
              </h3>
              <p className="text-[#6E7491] text-sm md:text-base leading-6">
                Confirme se o e-mail de confirmação não foi para a pasta de spam. 
                Caso não tenha recebido em até 30 minutos, entre em contato conosco informando o e-mail usado na compra.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#54cdb7] text-lg">
                Há reembolso em caso de cancelamento?
              </h3>
              <p className="text-[#6E7491] text-sm md:text-base leading-6">
                Sim, desde que o cancelamento seja solicitado dentro do prazo previsto na política de reembolso. 
                O valor é devolvido no mesmo método de pagamento em até 10 dias úteis.
              </p>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t-2 border-[#CBD4E6] w-full" />

        {/* Seção de Contato */}
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-lg md:text-2xl font-semibold text-[#2E3A59]">
              Ainda precisa de ajuda?
            </h2>
            <p className="text-[#6E7491] text-sm md:text-base mt-1">
              Nossa equipe está disponível para esclarecer qualquer dúvida adicional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 md:mt-0">
            <a
              className="flex items-center gap-2 text-[#54cdb7] font-medium "
            >
              <Mail size={18} /> AirLinkSuporte@gmail.com
            </a>
            <a
              className="flex items-center gap-2 text-[#54cdb7] font-medium "
            >
              <Phone size={18} /> +55 (43) 99876-5432
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
