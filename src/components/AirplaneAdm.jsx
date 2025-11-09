import { useState } from "react";

const AirplaneAdm = ({ aeronaves, handleExcluir, handleAdicionar, novo, setNovo, setAeronaves }) => {
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({ numero: "", tipo: "" });

  const handleEditar = (aeronave) => {
    setEditandoId(aeronave.id);
    setEditData({ numero: aeronave.numero, tipo: aeronave.tipo });
  };

  const handleSalvarEdicao = (id) => {
    setAeronaves((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, numero: editData.numero, tipo: editData.tipo }
          : a
      )
    );
    setEditandoId(null);
  };

  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setEditData({ numero: "", tipo: "" });
  };

  return (
    <>
      <h2 className="text-[#6E7491] font-semibold text-lg mb-3">
        Gerenciar Aeronaves
      </h2>

      {/* Formulário de adição */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Número da aeronave"
          className="border p-2 rounded w-full sm:w-[200px]"
          value={novo.numero || ""}
          onChange={(e) => setNovo({ ...novo, numero: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo da aeronave"
          className="border p-2 rounded w-full sm:w-[250px]"
          value={novo.tipo || ""}
          onChange={(e) => setNovo({ ...novo, tipo: e.target.value })}
        />
        <button
          onClick={() => handleAdicionar("aeronave")}
          className="bg-[#605DEC] text-white px-4 py-2 rounded hover:bg-[#4b47d1]"
        >
          Adicionar
        </button>
      </div>

      {/* Tabela de aeronaves */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#F3F4F6] text-[#6E7491]">
          <tr>
            <th className="px-4 py-3 text-left">Número</th>
            <th className="px-4 py-3 text-left">Tipo</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {aeronaves.map((a) => (
            <tr
              key={a.id}
              className="border-t border-gray-200 hover:bg-[#F9FAFB]"
            >
              <td className="px-4 py-3">
                {editandoId === a.id ? (
                  <input
                    type="text"
                    value={editData.numero}
                    onChange={(e) =>
                      setEditData({ ...editData, numero: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.numero
                )}
              </td>

              <td className="px-4 py-3">
                {editandoId === a.id ? (
                  <input
                    type="text"
                    value={editData.tipo}
                    onChange={(e) =>
                      setEditData({ ...editData, tipo: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.tipo
                )}
              </td>

              <td className="px-4 py-3 flex gap-3">
                {editandoId === a.id ? (
                  <>
                    <button
                      onClick={() => handleSalvarEdicao(a.id)}
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
                      onClick={() => handleEditar(a)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir("aeronave", a.id)}
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

export default AirplaneAdm;
