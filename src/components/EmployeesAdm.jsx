import { useState } from "react";

const EmployeesAdm = ({ funcionarios, setFuncionarios }) => {
  const [novo, setNovo] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({
    nome: "",
    dataNascimento: "",
    telefone: "",
    email: "",
    categoria: "",
  });

  // Categorias fixas do sistema
  const categorias = [
    "Piloto",
    "Copiloto",
    "Comissário de Bordo",
    "Atendente",
    "Mecânico de Voo",
    "Gerente de Operações",
    "Técnico de Manutenção",
  ];

  // Adicionar novo funcionário
  const handleAdicionar = () => {
    if (!novo.nome || !novo.dataNascimento || !novo.telefone || !novo.email || !novo.categoria) {
      alert("Preencha todos os campos para adicionar um funcionário!");
      return;
    }

    setFuncionarios((prev) => [
      ...prev,
      { id: Date.now(), ...novo },
    ]);
    setNovo({});
  };

  // Excluir funcionário
  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este funcionário?")) {
      setFuncionarios((prev) => prev.filter((f) => f.id !== id));
    }
  };

  // Editar funcionário
  const handleEditar = (func) => {
    setEditandoId(func.id);
    setEditData({ ...func });
  };

  // Salvar edição
  const handleSalvarEdicao = (id) => {
    setFuncionarios((prev) =>
      prev.map((f) => (f.id === id ? editData : f))
    );
    setEditandoId(null);
  };

  // Cancelar edição
  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setEditData({
      nome: "",
      dataNascimento: "",
      telefone: "",
      email: "",
      categoria: "",
    });
  };

  return (
    <>
      <h2 className="text-[#6E7491] font-semibold text-lg mb-3">
        Gerenciar Funcionários
      </h2>

      {/* Formulário de adição */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome completo"
          className="border p-2 rounded w-full sm:w-[250px]"
          value={novo.nome || ""}
          onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded w-full sm:w-[180px]"
          value={novo.dataNascimento || ""}
          onChange={(e) => setNovo({ ...novo, dataNascimento: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Telefone celular"
          className="border p-2 rounded w-full sm:w-[180px]"
          value={novo.telefone || ""}
          onChange={(e) => setNovo({ ...novo, telefone: e.target.value })}
        />
        <input
          type="email"
          placeholder="E-mail"
          className="border p-2 rounded w-full sm:w-[220px]"
          value={novo.email || ""}
          onChange={(e) => setNovo({ ...novo, email: e.target.value })}
        />

        {/* Menu de seleção de categoria */}
        <select
          className="border p-2 rounded w-full sm:w-[180px] text-[#6E7491]"
          value={novo.categoria || ""}
          onChange={(e) => setNovo({ ...novo, categoria: e.target.value })}
        >
          <option value="">Selecione a categoria</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdicionar}
          className="bg-[#605DEC] text-white px-4 py-2 rounded hover:bg-[#4b47d1]"
        >
          Adicionar
        </button>
      </div>

      {/* Tabela de funcionários */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#F3F4F6] text-[#6E7491]">
          <tr>
            <th className="px-4 py-3 text-left">Nome</th>
            <th className="px-4 py-3 text-left">Nascimento</th>
            <th className="px-4 py-3 text-left">Telefone</th>
            <th className="px-4 py-3 text-left">E-mail</th>
            <th className="px-4 py-3 text-left">Categoria</th>
            <th className="px-4 py-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.id} className="border-t border-gray-200 hover:bg-[#F9FAFB]">
              <td className="px-4 py-3">
                {editandoId === f.id ? (
                  <input
                    type="text"
                    value={editData.nome}
                    onChange={(e) => setEditData({ ...editData, nome: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  f.nome
                )}
              </td>
              <td className="px-4 py-3">
                {editandoId === f.id ? (
                  <input
                    type="date"
                    value={editData.dataNascimento}
                    onChange={(e) => setEditData({ ...editData, dataNascimento: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  f.dataNascimento
                )}
              </td>
              <td className="px-4 py-3">
                {editandoId === f.id ? (
                  <input
                    type="tel"
                    value={editData.telefone}
                    onChange={(e) => setEditData({ ...editData, telefone: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  f.telefone
                )}
              </td>
              <td className="px-4 py-3">
                {editandoId === f.id ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  f.email
                )}
              </td>
              <td className="px-4 py-3">
                {editandoId === f.id ? (
                  <select
                    value={editData.categoria}
                    onChange={(e) => setEditData({ ...editData, categoria: e.target.value })}
                    className="border p-1 rounded w-full text-[#6E7491]"
                  >
                    <option value="">Selecione</option>
                    {categorias.map((cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                ) : (
                  f.categoria
                )}
              </td>
              <td className="px-4 py-3 flex flex-wrap gap-2">
                {editandoId === f.id ? (
                  <>
                    <button
                      onClick={() => handleSalvarEdicao(f.id)}
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
                      onClick={() => handleEditar(f)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir(f.id)}
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

export default EmployeesAdm;
