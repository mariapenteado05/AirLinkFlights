const HeaderAdm = ({ abaAtiva, setAbaAtiva }) => {
  const abas = [
    { chave: "tipoVoo", label: "Tipos de Voo" },
    { chave: "tipoAeronave", label: "Tipos de Aeronave" },
    { chave: "aeronave", label: "Aeronaves" },
    { chave: "funcionarios", label: "Funcionários" }, 
    { chave: "aeroportos", label: "Aeroportos"},
    { chave: "voos", label: "Voos"}
  ];

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h1 className="text-[#6E7491] text-[22px] font-bold">
        Painel Administrativo - AirLink
      </h1>

      <div className="flex flex-wrap gap-2 justify-center">
        {abas.map(({ chave, label }) => (
          <button
            key={chave}
            onClick={() => setAbaAtiva(chave)}
            className={`px-3 py-2 rounded transition-all duration-200 ${
              abaAtiva === chave
                ? "bg-[#605DEC] text-white"
                : "bg-gray-200 text-[#6E7491] hover:bg-[#E9E8FC]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default HeaderAdm;
