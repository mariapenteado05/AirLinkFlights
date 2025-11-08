import { useState } from "react";

const UsersManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria.silva@example.com",
      telefone: "(11) 99999-9999",
      cidade: "São Paulo",
      status: "Ativo",
    },
    {
      id: 2,
      nome: "João Pereira",
      email: "joao.pereira@example.com",
      telefone: "(21) 98888-8888",
      cidade: "Rio de Janeiro",
      status: "Ativo",
    },
    {
      id: 3,
      nome: "Ana Costa",
      email: "ana.costa@example.com",
      telefone: "(41) 97777-7777",
      cidade: "Curitiba",
      status: "Inativo",
    },
  ]);

  return (
    <div className="px-8 py-10 flex flex-col gap-8">
      {/* Título */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[#6E7491] font-bold text-2xl">
            Gerenciamento de <span className="text-[#605DEC]">Usuários</span>
          </h1>
          <p className="text-[#7C8DB0] text-sm mt-2">
            Veja, edite e gerencie os cadastros de usuários do sistema AirLink.
          </p>
        </div>
        <button className="bg-[#605DEC] text-white rounded-md px-5 py-2 hover:bg-[#4e4ad8] transition">
          + Adicionar Usuário
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-[#F3F4F6] text-[#6E7491]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Telefone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Cidade</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 hover:bg-[#F9FAFB] transition"
              >
                <td className="px-4 py-3">{user.nome}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.telefone}</td>
                <td className="px-4 py-3">{user.cidade}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === "Ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button className="text-[#605DEC] hover:underline">
                    Editar
                  </button>
                  <button className="text-[#DC2626] hover:underline">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
