import { useState } from "react";
import { toast } from "react-toastify";
import { HeaderAdm, FlightTypeAdm, AirplaneTypeAdm, AirplaneAdm, EmployeesAdm, AirportsAdm, FlightsAdm } from "../components";

const AdminDashboard = () => {
  const [abaAtiva, setAbaAtiva] = useState("tipoVoo");

  // === Estados principais ===
  const [tiposVoo, setTiposVoo] = useState([
    { id: 1, nome: "Doméstico", descricao: "Voos dentro do território nacional" },
    { id: 2, nome: "Internacional", descricao: "Voos entre países" },
  ]);

  const [tiposAeronave, setTiposAeronave] = useState([
    {
      id: 1,
      tipo: "Airbus A320",
      descricao: "Médio porte",
      assentos: 180,
      mapa: "30 fileiras, 6 assentos por fileira",
    },
    {
      id: 2,
      tipo: "Boeing 737",
      descricao: "Curto alcance",
      assentos: 160,
      mapa: "27 fileiras, 6 assentos por fileira",
    },
  ]);

  const [aeronaves, setAeronaves] = useState([
    { id: 1, numero: "PT-ABC", tipo: "Airbus A320" },
    { id: 2, numero: "PT-ZYX", tipo: "Boeing 737" },
  ]);

  // 👇 Estado para o módulo de funcionários (F6)
  const [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: "Ana Souza",
      dataNascimento: "1990-03-15",
      telefone: "(11) 98888-1234",
      email: "ana.souza@airlink.com",
      categoria: "Atendente",
    },
    {
      id: 2,
      nome: "Carlos Lima",
      dataNascimento: "1985-09-10",
      telefone: "(21) 97777-5678",
      email: "carlos.lima@airlink.com",
      categoria: "Piloto",
    },
  ]);

  const [aeroportos, setAeroportos] = useState([
    { id: 1, sigla: "GRU", nome: "Aeroporto Internacional de São Paulo", cidade: "Guarulhos", estado: "SP", pais: "Brasil" },
    { id: 2, sigla: "JFK", nome: "John F. Kennedy International Airport", cidade: "Nova York", estado: "NY", pais: "EUA" },
  ]);

  const [voos, setVoos] = useState([]);


  const [novo, setNovo] = useState({});

  // === Funções gerais ===
  const handleExcluir = (tipo, id) => {
    if (window.confirm("Tem certeza que deseja excluir este registro?")) {
      const actions = {
        tipoVoo: () => setTiposVoo(tiposVoo.filter((t) => t.id !== id)),
        tipoAeronave: () => setTiposAeronave(tiposAeronave.filter((t) => t.id !== id)),
        aeronave: () => setAeronaves(aeronaves.filter((a) => a.id !== id)),
      };
      actions[tipo]?.();
      toast.success("Registro excluído com sucesso!");
    }
  };

  const handleAdicionar = (tipo) => {
    if (tipo === "tipoVoo" && novo.nome) {
      setTiposVoo([...tiposVoo, { id: Date.now(), nome: novo.nome, descricao: novo.descricao }]);
      toast.success("Tipo de voo adicionado!");
    } else if (tipo === "tipoAeronave" && novo.tipo) {
      setTiposAeronave([
        ...tiposAeronave,
        {
          id: Date.now(),
          tipo: novo.tipo,
          descricao: novo.descricao,
          assentos: novo.assentos || 0,
          mapa: novo.mapa || "",
        },
      ]);
      toast.success("Tipo de aeronave adicionado!");
    } else if (tipo === "aeronave" && novo.numero) {
      setAeronaves([...aeronaves, { id: Date.now(), numero: novo.numero, tipo: novo.tipo }]);
      toast.success("Aeronave adicionada!");
    }
    setNovo({});
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-lg w-[90%] max-w-[1100px] rounded px-8 py-6 flex flex-col gap-6">
        {/* Cabeçalho com as abas */}
        <HeaderAdm abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />

        <div className="mt-6">
          {abaAtiva === "tipoVoo" && (
            <FlightTypeAdm
              tiposVoo={tiposVoo}
              handleExcluir={handleExcluir}
              handleAdicionar={handleAdicionar}
              novo={novo}
              setNovo={setNovo}
              setTiposVoo={setTiposVoo}
            />
          )}

          {abaAtiva === "tipoAeronave" && (
            <AirplaneTypeAdm
              tiposAeronave={tiposAeronave}
              handleExcluir={handleExcluir}
              handleAdicionar={handleAdicionar}
              novo={novo}
              setNovo={setNovo}
              setTiposAeronave={setTiposAeronave}
            />
          )}

          {abaAtiva === "aeronave" && (
            <AirplaneAdm
              aeronaves={aeronaves}
              handleExcluir={handleExcluir}
              handleAdicionar={handleAdicionar}
              novo={novo}
              setNovo={setNovo}
              setAeronaves={setAeronaves}
            />
          )}

          {/* ✅ Nova aba — Funcionários */}
          {abaAtiva === "funcionarios" && (
            <EmployeesAdm
              funcionarios={funcionarios}
              setFuncionarios={setFuncionarios}
            />
          )}

          {abaAtiva === "aeroportos" && (
            <AirportsAdm
              aeroportos={aeroportos}
              setAeroportos={setAeroportos}
            />
          )}
          {abaAtiva === "voos" && (
            <FlightsAdm
              voos={voos}
              setVoos={setVoos}
              tiposVoo={tiposVoo}
              tiposAeronave={tiposAeronave}
              aeroportos={aeroportos}
              funcionarios={funcionarios}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
