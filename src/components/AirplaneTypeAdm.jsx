import { useState, useEffect } from "react";

const AirplaneTypeAdm = ({
  tiposAeronave,
  handleExcluir,
  handleAdicionar,
  novo,
  setNovo,
  setTiposAeronave,
}) => {
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({
    tipo: "",
    descricao: "",
    fileiras: "",
    colunas: "",
    assentos: 0,
  });

  // Atualiza o total de assentos automaticamente durante a edição
  useEffect(() => {
    const total = (Number(editData.fileiras) || 0) * (Number(editData.colunas) || 0);
    setEditData((prev) => ({ ...prev, assentos: total }));
  }, [editData.fileiras, editData.colunas]);

  const handleEditar = (aeronave) => {
    const fileiras = aeronave.fileiras || Math.round(aeronave.assentos / 6);
    const colunas = aeronave.colunas || 6;
    setEditandoId(aeronave.id);
    setEditData({
      tipo: aeronave.tipo,
      descricao: aeronave.descricao,
      fileiras,
      colunas,
      assentos: fileiras * colunas,
    });
  };

  const handleSalvarEdicao = (id) => {
    setTiposAeronave((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              tipo: editData.tipo,
              descricao: editData.descricao,
              fileiras: Number(editData.fileiras),
              colunas: Number(editData.colunas),
              assentos: editData.assentos,
            }
          : a
      )
    );
    setEditandoId(null);
  };

  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setEditData({
      tipo: "",
      descricao: "",
      fileiras: "",
      colunas: "",
      assentos: 0,
    });
  };

  // Atualiza o total de assentos ao adicionar novo tipo
  const handleNovoAssento = (campo, valor) => {
    const atualizado = { ...novo, [campo]: valor };
    const fileiras = Number(atualizado.fileiras || 0);
    const colunas = Number(atualizado.colunas || 0);
    atualizado.assentos = fileiras * colunas;
    setNovo(atualizado);
  };

  return (
    <>
      <h2 className="text-[#6E7491] font-semibold text-lg mb-3">
        Gerenciar Tipos de Aeronave
      </h2>

      {/* Formulário de adição */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Tipo da aeronave"
          className="border p-2 rounded w-full sm:w-[180px]"
          value={novo.tipo || ""}
          onChange={(e) => setNovo({ ...novo, tipo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          className="border p-2 rounded w-full sm:w-[180px]"
          value={novo.descricao || ""}
          onChange={(e) => setNovo({ ...novo, descricao: e.target.value })}
        />
        <input
          type="number"
          placeholder="Fileiras"
          className="border p-2 rounded w-[100px]"
          value={novo.fileiras || ""}
          onChange={(e) => handleNovoAssento("fileiras", e.target.value)}
        />
        <input
          type="number"
          placeholder="Colunas"
          className="border p-2 rounded w-[100px]"
          value={novo.colunas || ""}
          onChange={(e) => handleNovoAssento("colunas", e.target.value)}
        />
        <input
          type="number"
          placeholder="Total de Assentos"
          className="border p-2 rounded w-[130px] bg-gray-100"
          value={novo.assentos || 0}
          disabled
        />
        <button
          onClick={() => handleAdicionar("tipoAeronave")}
          className="bg-[#605DEC] text-white px-4 py-2 rounded hover:bg-[#4b47d1]"
        >
          Adicionar
        </button>
      </div>

      {/* Tabela */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#F3F4F6] text-[#6E7491]">
          <tr>
            <th className="px-4 py-3 text-left">Tipo</th>
            <th className="px-4 py-3 text-left">Descrição</th>
            <th className="px-4 py-3 text-left">Fileiras</th>
            <th className="px-4 py-3 text-left">Colunas</th>
            <th className="px-4 py-3 text-left">Total de Assentos</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tiposAeronave.map((t) => (
            <tr key={t.id} className="border-t border-gray-200 hover:bg-[#F9FAFB]">
              <td className="px-4 py-3">
                {editandoId === t.id ? (
                  <input
                    type="text"
                    value={editData.tipo}
                    onChange={(e) =>
                      setEditData({ ...editData, tipo: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  t.tipo
                )}
              </td>

              <td className="px-4 py-3">
                {editandoId === t.id ? (
                  <input
                    type="text"
                    value={editData.descricao}
                    onChange={(e) =>
                      setEditData({ ...editData, descricao: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  t.descricao
                )}
              </td>

              <td className="px-4 py-3 text-center">
                {editandoId === t.id ? (
                  <input
                    type="number"
                    value={editData.fileiras}
                    onChange={(e) =>
                      setEditData({ ...editData, fileiras: e.target.value })
                    }
                    className="border p-1 rounded w-[70px] text-center"
                  />
                ) : (
                  <span>{t.fileiras || "-"}</span>
                )}
              </td>

              <td className="px-4 py-3 text-center">
                {editandoId === t.id ? (
                  <input
                    type="number"
                    value={editData.colunas}
                    onChange={(e) =>
                      setEditData({ ...editData, colunas: e.target.value })
                    }
                    className="border p-1 rounded w-[70px] text-center"
                  />
                ) : (
                  <span>{t.colunas || "-"}</span>
                )}
              </td>

              <td className="px-4 py-3 text-center">
                {editandoId === t.id ? (
                  <span className="text-[#605DEC] font-semibold">
                    {editData.assentos}
                  </span>
                ) : (
                  <span>{t.assentos}</span>
                )}
              </td>

              <td className="px-4 py-3 flex flex-wrap gap-2 justify-center">
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
                      onClick={() => handleExcluir("tipoAeronave", t.id)}
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

export default AirplaneTypeAdm;
