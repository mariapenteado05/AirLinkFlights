import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const onlyNumbers = (value) => value.replace(/\D/g, "");

  const maskCPF = (value) => {
    value = onlyNumbers(value);
    return value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14);
  };

  const maskTelefone = (value) => {
    value = onlyNumbers(value);
    return value
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  };

  const maskCEP = (value) => {
    value = onlyNumbers(value);
    return value.replace(/(\d{5})(\d)/, "$1-$2").substring(0, 9);
  };

  const maskRG = (value) => {
    value = onlyNumbers(value);
    return value
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1})$/, "$1-$2")
      .substring(0, 12);
  };

  const maskNumero = (value) => {
    value = onlyNumbers(value);
    return value.substring(0, 6);
  };

  const [user, setUser] = useState({
    nome: "Maria Silva",
    email: "maria.silva@example.com",
    telefone: "(11) 99999-9999",
    usuario: "mariasilva",
    senha: "123456",
    dataNascimento: "1998-10-25",
    cpf: "123.456.789-10",
    rg: "12.345.678-9",
    dataEmissao: "2015-03-10",
    orgaoEmissor: "SSP/SP",
    tipo: "Residencial",
    logradouro: "Rua das Flores",
    numero: "123",
    complemento: "Apto 202",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
    cep: "01001-000",
    cepCom: "02020-000",
    ruaCom: "Av. Paulista",
    numeroCom: "1500",
    bairroCom: "Bela Vista",
    cidadeCom: "São Paulo",
    estadoCom: "SP",
  });

  const [desempregado, setDesempregado] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [passagens] = useState([
    {
      id: 1,
      origem: "São Paulo (GRU)",
      destino: "Nova York (JFK)",
      data: "15/11/2025",
      status: "Confirmada",
      valor: "R$ 4.580,00",
    },
    {
      id: 2,
      origem: "Curitiba (CWB)",
      destino: "Lisboa (LIS)",
      data: "02/02/2026",
      status: "Pendente",
      valor: "R$ 3.290,00",
    },
  ]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    toast.success("Dados atualizados com sucesso!");
  };

  const handleConfirmacao = (id) => {
    navigate(`/confirm/`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-lg w-[90%] max-w-[700px] rounded px-8 py-6 flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <h1 className="text-[#6E7491] text-[22px] font-bold">
            Meu Perfil - AirLink
          </h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-[#605DEC] hover:underline"
          >
            {editMode ? "Cancelar" : "Editar"}
          </button>
        </header>

        {/* FORMULÁRIO */}
        <form className="flex flex-col gap-3">
          <input
            name="nome"
            placeholder="Nome completo"
            value={user.nome}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <input
            name="telefone"
            placeholder="Telefone"
            value={user.telefone}
            onChange={(e) =>
              setUser({ ...user, telefone: maskTelefone(e.target.value) })
            }
            disabled={!editMode}
            className="input"
          />
          <input
            name="usuario"
            placeholder="Nome de usuário"
            value={user.usuario}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={user.senha}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <input
            name="dataNascimento"
            type="date"
            value={user.dataNascimento}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <input
            name="cpf"
            placeholder="CPF"
            value={user.cpf}
            onChange={(e) => setUser({ ...user, cpf: maskCPF(e.target.value) })}
            disabled={!editMode}
            className="input"
          />
          <input
            name="rg"
            placeholder="RG"
            value={user.rg}
            onChange={(e) => setUser({ ...user, rg: maskRG(e.target.value) })}
            maxLength={12}
            disabled={!editMode}
            className="input"
          />
          <input
            name="dataEmissao"
            type="date"
            value={user.dataEmissao}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <input
            name="orgaoEmissor"
            placeholder="Órgão Emissor"
            value={user.orgaoEmissor}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />

          {/* ENDEREÇO */}
          <h2 className="text-[#6E7491] font-semibold mt-4">Endereço</h2>
          <input
            name="tipo"
            placeholder="Tipo (Residencial, Comercial)"
            value={user.tipo}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <input
            name="logradouro"
            placeholder="Logradouro"
            value={user.logradouro}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <div className="flex gap-2">
            <input
              name="numero"
              placeholder="Número"
              value={user.numero}
              onChange={(e) =>
                setUser({ ...user, numero: maskNumero(e.target.value) })
              }
              disabled={!editMode}
              className="input w-1/2"
            />
            <input
              name="complemento"
              placeholder="Complemento"
              value={user.complemento}
              onChange={handleChange}
              disabled={!editMode}
              className="input w-1/2"
            />
          </div>
          <input
            name="bairro"
            placeholder="Bairro"
            value={user.bairro}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <input
            name="cidade"
            placeholder="Cidade"
            value={user.cidade}
            onChange={handleChange}
            disabled={!editMode}
            className="input"
          />
          <div className="flex gap-2">
            <input
              name="estado"
              placeholder="Estado"
              value={user.estado}
              onChange={handleChange}
              disabled={!editMode}
              className="input w-1/2"
            />
            <input
              name="pais"
              placeholder="País"
              value={user.pais}
              onChange={handleChange}
              disabled={!editMode}
              className="input w-1/2"
            />
          </div>
          <input
            name="cep"
            placeholder="CEP"
            value={user.cep}
            onChange={(e) => setUser({ ...user, cep: maskCEP(e.target.value) })}
            disabled={!editMode}
            className="input"
          />

          {/* Checkbox Desempregado */}
          <div>
            <label className="text-[#6E7491]">
              <input
                type="checkbox"
                checked={desempregado}
                onChange={() => setDesempregado(!desempregado)}
                disabled={!editMode}
              />{" "}
              Sou desempregado
            </label>
          </div>

          {/* Endereço Comercial */}
          {!desempregado && (
            <>
              <h2>Endereço Comercial</h2>
              <input
                name="cepCom"
                placeholder="CEP Comercial"
                value={user.cepCom}
                onChange={(e) =>
                  setUser({ ...user, cepCom: maskCEP(e.target.value) })
                }
                disabled={!editMode}
                className="input"
              />
              <input
                name="ruaCom"
                placeholder="Rua Comercial"
                value={user.ruaCom}
                onChange={handleChange}
                disabled={!editMode}
                className="input"
              />
              <input
                name="numeroCom"
                placeholder="Número Comercial"
                value={user.numeroCom}
                onChange={(e) =>
                  setUser({
                    ...user,
                    numeroCom: maskNumero(e.target.value),
                  })
                }
                disabled={!editMode}
                className="input w-1/2"
              />
              <input
                name="bairroCom"
                placeholder="Bairro Comercial"
                value={user.bairroCom}
                onChange={handleChange}
                disabled={!editMode}
                className="input"
              />
              <input
                name="cidadeCom"
                placeholder="Cidade Comercial"
                value={user.cidadeCom}
                onChange={handleChange}
                disabled={!editMode}
                className="input"
              />
              <input
                name="estadoCom"
                placeholder="Estado Comercial"
                maxLength={2}
                value={user.estadoCom}
                onChange={(e) =>
                  setUser({
                    ...user,
                    estadoCom: e.target.value.toUpperCase(),
                  })
                }
                disabled={!editMode}
                className="input"
              />
            </>
          )}
        </form>

        {editMode && (
          <button
            onClick={handleSave}
            className="bg-[#605DEC] text-white rounded-md py-3 mt-3 hover:bg-[#4b47d1] transition"
          >
            Salvar alterações
          </button>
        )}

        {/* 🧳 Passagens compradas */}
        <div className="mt-6">
          <h2 className="text-[#6E7491] font-semibold text-lg mb-3">
            Minhas Passagens
          </h2>
          {passagens.length === 0 ? (
            <p className="text-[#7C8DB0] text-sm">
              Você ainda não possui passagens compradas.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-[#F3F4F6] text-[#6E7491]">
                  <tr>
                    <th className="px-4 py-3 text-left">Origem</th>
                    <th className="px-4 py-3 text-left">Destino</th>
                    <th className="px-4 py-3 text-left">Data</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Valor</th>
                    <th className="px-4 py-3 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {passagens.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-gray-200 hover:bg-[#F9FAFB]"
                    >
                      <td className="px-4 py-3">{p.origem}</td>
                      <td className="px-4 py-3">{p.destino}</td>
                      <td className="px-4 py-3">{p.data}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            p.status === "Confirmada"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{p.valor}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleConfirmacao(p.id)}
                          className="bg-[#605DEC] text-white text-xs px-3 py-1.5 rounded hover:bg-[#4b47d1] transition"
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
