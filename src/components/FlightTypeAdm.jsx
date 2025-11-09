import { useState } from "react";

const FlightTypeAdm = ({ tiposVoo, handleExcluir, handleAdicionar, novo, setNovo, setTiposVoo }) => {
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({ nome: "", descricao: "" });

  const handleEditar = (tipo) => {
    setEditandoId(tipo.id);
    setEditData({ nome: tipo.nome, descricao: tipo.descricao });
  };

  const handleSalvarEdicao = (id) => {
    setTiposVoo((prev) =>
      prev.map((t) => (t.id === id ? { ...t, nome: editData.nome, descricao: editData.descricao } : t))
    );
    setEditandoId(null);
  };

  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setEditData({ nome: "", descricao: "" });
  };

  return (
    <>
      <h2 className="text-[#6E7491] font-semibold text-lg mb-3">Gerenciar Tipos de Voo</h2>

      {/* Formulário de adição */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome abreviado"
          className="border p-2 rounded w-full sm:w-[200px]"
          value={novo.nome || ""}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição (opcional)"
          className="border p-2 rounded w-full sm:w-[300px]"
          value={novo.descricao || ""}
          onChange={(e) => setNovo({ ...novo, descricao: e.target.value })}
        />
        <button
          onClick={() => handleAdicionar("tipoVoo")}
          className="bg-[#605DEC] text-white px-4 py-2 rounded hover:bg-[#4b47d1]"
        >
          Adicionar
        </button>
      </div>

      {/* Tabela */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#F3F4F6] text-[#6E7491]">
          <tr>
            <th className="px-4 py-3 text-left">Nome</th>
            <th className="px-4 py-3 text-left">Descrição</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tiposVoo.map((t) => (
            <tr key={t.id} className="border-t border-gray-200 hover:bg-[#F9FAFB]">
              <td className="px-4 py-3">
                {editandoId === t.id ? (
                  <input
                    type="text"
                    value={editData.nome}
                    onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  t.nome
                )}
              </td>

              <td className="px-4 py-3">
                {editandoId === t.id ? (
                  <input
                    type="text"
                    value={editData.descricao}
                    onChange={(e) => setEditData({ ...editData, descricao: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  t.descricao
                )}
              </td>

              <td className="px-4 py-3 flex flex-wrap gap-2">
                {editandoId === t.id ? (
                  <>
                    <button
                      onClick={() => handleSalvarEdicao(t.id)}
                      className="text-green-600 hover:underline text-sm"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={handleCancelarEdicao}
                      className="text-gray-500 hover:underline text-sm"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditar(t)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir("tipoVoo", t.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Excluir
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FlightTypeAdm;
