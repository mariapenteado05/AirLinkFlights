import { useState } from "react";

const FlightsAdm = ({
  voos,
  setVoos,
  tiposVoo,
  tiposAeronave,
  aeroportos,
  funcionarios,
}) => {
  const [novo, setNovo] = useState({
    numero: "",
    tipoVoo: "",
    tipoAeronave: "",
    origem: "",
    destino: "",
    escalas: [],
    tripulacao: [],
    saidaOrigem: "",
    chegadaDestino: "",
    duracao: "",
  });

  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({});

  // Função para adicionar voo
  const handleAdicionar = () => {
    if (
      !novo.numero ||
      !novo.tipoVoo ||
      !novo.tipoAeronave ||
      !novo.origem ||
      !novo.destino ||
      !novo.saidaOrigem ||
      !novo.chegadaDestino ||
      !novo.duracao
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    setVoos((prev) => [...prev, { id: Date.now(), ...novo }]);
    setNovo({
      numero: "",
      tipoVoo: "",
      tipoAeronave: "",
      origem: "",
      destino: "",
      escalas: [],
      tripulacao: [],
      saidaOrigem: "",
      chegadaDestino: "",
      duracao: "",
    });
  };

  // Função para excluir voo
  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este voo?")) {
      setVoos((prev) => prev.filter((v) => v.id !== id));
    }
  };

  // Editar
  const handleEditar = (voo) => {
    setEditandoId(voo.id);
    setEditData({ ...voo });
  };

  const handleSalvarEdicao = (id) => {
    setVoos((prev) => prev.map((v) => (v.id === id ? editData : v)));
    setEditandoId(null);
  };

  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setEditData({});
  };

  // Adiciona escala
  const addEscala = () => {
    const novaEscala = { aeroporto: "", saida: "", chegada: "" };
    setNovo({ ...novo, escalas: [...novo.escalas, novaEscala] });
  };

  // Adiciona membro da tripulação
  const addTripulante = () => {
    setNovo({ ...novo, tripulacao: [...novo.tripulacao, ""] });
  };

  return (
    <>
      <h2 className="text-[#6E7491] font-semibold text-lg mb-3">
        Gerenciar Voos
      </h2>

      {/* Formulário de adição */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Número do voo"
          className="border p-2 rounded w-full sm:w-[120px]"
          value={novo.numero}
          onChange={(e) => setNovo({ ...novo, numero: e.target.value })}
        />

        <select
          className="border p-2 rounded w-full sm:w-[180px]"
          value={novo.tipoVoo}
          onChange={(e) => setNovo({ ...novo, tipoVoo: e.target.value })}
        >
          <option value="">Tipo de Voo</option>
          {tiposVoo.map((t) => (
            <option key={t.id} value={t.nome}>
              {t.nome}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full sm:w-[200px]"
          value={novo.tipoAeronave}
          onChange={(e) => setNovo({ ...novo, tipoAeronave: e.target.value })}
        >
          <option value="">Tipo de Aeronave</option>
          {tiposAeronave.map((t) => (
            <option key={t.id} value={t.tipo}>
              {t.tipo}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full sm:w-[150px]"
          value={novo.origem}
          onChange={(e) => setNovo({ ...novo, origem: e.target.value })}
        >
          <option value="">Origem</option>
          {aeroportos.map((a) => (
            <option key={a.id} value={a.sigla}>
              {a.sigla} - {a.cidade}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full sm:w-[150px]"
          value={novo.destino}
          onChange={(e) => setNovo({ ...novo, destino: e.target.value })}
        >
          <option value="">Destino</option>
          {aeroportos.map((a) => (
            <option key={a.id} value={a.sigla}>
              {a.sigla} - {a.cidade}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          className="border p-2 rounded w-full sm:w-[200px]"
          value={novo.saidaOrigem}
          onChange={(e) => setNovo({ ...novo, saidaOrigem: e.target.value })}
        />

        <input
          type="datetime-local"
          className="border p-2 rounded w-full sm:w-[200px]"
          value={novo.chegadaDestino}
          onChange={(e) => setNovo({ ...novo, chegadaDestino: e.target.value })}
        />

        <input
          type="text"
          placeholder="Duração total (hh:mm)"
          className="border p-2 rounded w-full sm:w-[140px]"
          value={novo.duracao}
          onChange={(e) => setNovo({ ...novo, duracao: e.target.value })}
        />

        <button
          onClick={addEscala}
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
        >
          + Escala
        </button>
        <button
          onClick={addTripulante}
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
        >
          + Tripulante
        </button>

        <button
          onClick={handleAdicionar}
          className="bg-[#605DEC] text-white px-4 py-2 rounded hover:bg-[#4b47d1]"
        >
          Adicionar Voo
        </button>
      </div>

      {/* Listagem de escalas */}
      {novo.escalas.length > 0 && (
        <div className="mb-4 border rounded p-3 bg-gray-50">
          <h3 className="font-semibold mb-2 text-[#6E7491]">Escalas</h3>
          {novo.escalas.map((e, i) => (
            <div key={i} className="flex flex-wrap gap-2 mb-2">
              <select
                className="border p-2 rounded w-full sm:w-[150px]"
                value={e.aeroporto}
                onChange={(ev) => {
                  const novas = [...novo.escalas];
                  novas[i].aeroporto = ev.target.value;
                  setNovo({ ...novo, escalas: novas });
                }}
              >
                <option value="">Aeroporto</option>
                {aeroportos.map((a) => (
                  <option key={a.id} value={a.sigla}>
                    {a.sigla}
                  </option>
                ))}
              </select>
              <input
                type="datetime-local"
                className="border p-2 rounded w-full sm:w-[200px]"
                placeholder="Saída"
                value={e.saida}
                onChange={(ev) => {
                  const novas = [...novo.escalas];
                  novas[i].saida = ev.target.value;
                  setNovo({ ...novo, escalas: novas });
                }}
              />
              <input
                type="datetime-local"
                className="border p-2 rounded w-full sm:w-[200px]"
                placeholder="Chegada"
                value={e.chegada}
                onChange={(ev) => {
                  const novas = [...novo.escalas];
                  novas[i].chegada = ev.target.value;
                  setNovo({ ...novo, escalas: novas });
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Listagem de tripulação */}
      {novo.tripulacao.length > 0 && (
        <div className="mb-4 border rounded p-3 bg-gray-50">
          <h3 className="font-semibold mb-2 text-[#6E7491]">Tripulação</h3>
          {novo.tripulacao.map((t, i) => (
            <select
              key={i}
              className="border p-2 rounded w-full sm:w-[200px] mb-2"
              value={t}
              onChange={(ev) => {
                const novaTrip = [...novo.tripulacao];
                novaTrip[i] = ev.target.value;
                setNovo({ ...novo, tripulacao: novaTrip });
              }}
            >
              <option value="">Selecione funcionário</option>
              {funcionarios.map((f) => (
                <option key={f.id} value={f.nome}>
                  {f.nome} - {f.categoria}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}

      {/* Tabela de voos */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#F3F4F6] text-[#6E7491]">
          <tr>
            <th className="px-4 py-3 text-left">Nº</th>
            <th className="px-4 py-3 text-left">Tipo</th>
            <th className="px-4 py-3 text-left">Aeronave</th>
            <th className="px-4 py-3 text-left">Origem</th>
            <th className="px-4 py-3 text-left">Destino</th>
            <th className="px-4 py-3 text-left">Duração</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {voos.map((v) => (
            <tr key={v.id} className="border-t border-gray-200 hover:bg-[#F9FAFB]">
              <td className="px-4 py-3">{v.numero}</td>
              <td className="px-4 py-3">{v.tipoVoo}</td>
              <td className="px-4 py-3">{v.tipoAeronave}</td>
              <td className="px-4 py-3">{v.origem}</td>
              <td className="px-4 py-3">{v.destino}</td>
              <td className="px-4 py-3">{v.duracao}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => handleEditar(v)}
                  className="text-blue-500 hover:underline text-sm mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(v.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FlightsAdm;
