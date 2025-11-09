import { useState } from "react";

const AirportsAdm = ({ aeroportos, setAeroportos }) => {
  const [novo, setNovo] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({
    sigla: "",
    nome: "",
    cidade: "",
    estado: "",
    pais: "",
  });

  // Adicionar novo aeroporto
  const handleAdicionar = () => {
    if (!novo.sigla || !novo.nome || !novo.cidade || !novo.estado || !novo.pais) {
      alert("Preencha todos os campos para adicionar um aeroporto!");
      return;
    }

    setAeroportos((prev) => [...prev, { id: Date.now(), ...novo }]);
    setNovo({});
  };

  // Excluir aeroporto
  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este aeroporto?")) {
      setAeroportos((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Editar aeroporto
  const handleEditar = (aeroporto) => {
    setEditandoId(aeroporto.id);
    setEditData({ ...aeroporto });
  };

  // Salvar edição
  const handleSalvarEdicao = (id) => {
    setAeroportos((prev) =>
      prev.map((a) => (a.id === id ? editData : a))
    );
    setEditandoId(null);
  };

  // Cancelar edição
  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setEditData({
      sigla: "",
      nome: "",
      cidade: "",
      estado: "",
      pais: "",
    });
  };

  return (
    <>
      <h2 className="text-[#6E7491] font-semibold text-lg mb-3">
        Gerenciar Aeroportos
      </h2>

      {/* Formulário de adição */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Sigla (ex: GRU)"
          className="border p-2 rounded w-full sm:w-[100px]"
          value={novo.sigla || ""}
          onChange={(e) => setNovo({ ...novo, sigla: e.target.value.toUpperCase() })}
        />
        <input
          type="text"
          placeholder="Nome do aeroporto"
          className="border p-2 rounded w-full sm:w-[250px]"
          value={novo.nome || ""}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cidade"
          className="border p-2 rounded w-full sm:w-[180px]"
          value={novo.cidade || ""}
          onChange={(e) => setNovo({ ...novo, cidade: e.target.value })}
        />
        <input
          type="text"
          placeholder="Estado"
          className="border p-2 rounded w-full sm:w-[100px]"
          value={novo.estado || ""}
          onChange={(e) => setNovo({ ...novo, estado: e.target.value.toUpperCase() })}
          maxLength={2}
        />
        <input
          type="text"
          placeholder="País"
          className="border p-2 rounded w-full sm:w-[150px]"
          value={novo.pais || ""}
          onChange={(e) => setNovo({ ...novo, pais: e.target.value })}
        />
        <button
          onClick={handleAdicionar}
          className="bg-[#605DEC] text-white px-4 py-2 rounded hover:bg-[#4b47d1]"
        >
          Adicionar
        </button>
      </div>

      {/* Tabela de aeroportos */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#F3F4F6] text-[#6E7491]">
          <tr>
            <th className="px-4 py-3 text-left">Sigla</th>
            <th className="px-4 py-3 text-left">Nome</th>
            <th className="px-4 py-3 text-left">Cidade</th>
            <th className="px-4 py-3 text-left">Estado</th>
            <th className="px-4 py-3 text-left">País</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {aeroportos.map((a) => (
            <tr key={a.id} className="border-t border-gray-200 hover:bg-[#F9FAFB]">
              <td className="px-4 py-3">
                {editandoId === a.id ? (
                  <input
                    type="text"
                    value={editData.sigla}
                    onChange={(e) =>
                      setEditData({ ...editData, sigla: e.target.value.toUpperCase() })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.sigla
                )}
              </td>
              <td className="px-4 py-3">
                {editandoId === a.id ? (
                  <input
                    type="text"
                    value={editData.nome}
                    onChange={(e) =>
                      setEditData({ ...editData, nome: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.nome
                )}
              </td>
              <td className="px-4 py-3">
                {editandoId === a.id ? (
                  <input
                    type="text"
                    value={editData.cidade}
                    onChange={(e) =>
                      setEditData({ ...editData, cidade: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.cidade
                )}
              </td>
              <td className="px-4 py-3">
                {editandoId === a.id ? (
                  <input
                    type="text"
                    value={editData.estado}
                    onChange={(e) =>
                      setEditData({ ...editData, estado: e.target.value.toUpperCase() })
                    }
                    className="border p-1 rounded w-full"
                    maxLength={2}
                  />
                ) : (
                  a.estado
                )}
              </td>
              <td className="px-4 py-3">
                {editandoId === a.id ? (
                  <input
                    type="text"
                    value={editData.pais}
                    onChange={(e) =>
                      setEditData({ ...editData, pais: e.target.value })
                    }
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  a.pais
                )}
              </td>
              <td className="px-4 py-3 flex flex-wrap gap-2">
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
                      onClick={() => handleExcluir(a.id)}
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

export default AirportsAdm;
