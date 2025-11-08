import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  // === FUNÇÕES DE MÁSCARA ===
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

  // === ESTADO DO FORMULÁRIO ===
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    usuario: "",
    senha: "",
    dataNascimento: "",
    cpf: "",
    rg: "",
    dataEmissao: "",
    orgaoEmissor: "",
    tipo: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "",
    cep: "",
    localTrabalho: "",
    cepCom: "",
    ruaCom: "",
    numeroCom: "",
    bairroCom: "",
    cidadeCom: "",
    estadoCom: "",
  });

  const [desempregado, setDesempregado] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitInputs = (e) => {
    e.preventDefault();
    const empty = Object.values(formData).some((v) => v.trim() === "");
    if (empty && !desempregado) {
      toast.warning("Por favor, preencha todos os campos!");
      return;
    }
    if (!check1) {
      toast.warning("Você deve aceitar os termos e condições!");
      return;
    }
    toast.success("Cadastro realizado com sucesso!");
    navigate("/");
  };

  // === COMPONENTE DE INPUT PADRÃO ===
  const Input = ({ label, name, type = "text", value, onChange, placeholder, ...props }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[#6E7491] text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#605DEC] transition"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-lg w-[90%] max-w-[800px] rounded-xl px-8 py-10 flex flex-col gap-8">
        <header className="flex items-center justify-center border-b pb-4">
          <h1 className="text-[#605DEC] text-2xl font-bold">Cadastre-se!</h1>
        </header>

        <form className="flex flex-col gap-6">
          {/* SEÇÃO 1: DADOS PESSOAIS */}
          <section>
            <h2 className="text-lg font-semibold text-[#6E7491] border-b pb-2 mb-4">Dados Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome completo" name="nome" value={formData.nome} onChange={handleChange} />
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
              <Input
                label="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: maskTelefone(e.target.value) })}
              />
              <Input label="Nome de usuário" name="usuario" value={formData.usuario} onChange={handleChange} />
              <Input label="Senha" name="senha" type="password" value={formData.senha} onChange={handleChange} />
              <Input label="Data de nascimento" name="dataNascimento" type="date" onChange={handleChange} />
            </div>
          </section>

          {/* SEÇÃO 2: DOCUMENTOS */}
          <section>
            <h2 className="text-lg font-semibold text-[#6E7491] border-b pb-2 mb-4">Documentos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: maskCPF(e.target.value) })}
              />
              <Input
                label="RG"
                name="rg"
                value={formData.rg}
                onChange={(e) => setFormData({ ...formData, rg: maskRG(e.target.value) })}
              />
              <Input label="Data de emissão" name="dataEmissao" type="date" onChange={handleChange} />
              <Input label="Órgão emissor" name="orgaoEmissor" value={formData.orgaoEmissor} onChange={handleChange} />
            </div>
          </section>

          {/* SEÇÃO 3: ENDEREÇO RESIDENCIAL */}
          <section>
            <h2 className="text-lg font-semibold text-[#6E7491] border-b pb-2 mb-4">Endereço Residencial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Tipo" name="tipo" value={formData.tipo} onChange={handleChange} />
              <Input label="Logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} />
              <Input
                label="Número"
                name="numero"
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: maskNumero(e.target.value) })}
              />
              <Input label="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
              <Input label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
              <Input label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
              <Input label="Estado" name="estado" value={formData.estado} onChange={handleChange} />
              <Input label="País" name="pais" value={formData.pais} onChange={handleChange} />
              <Input
                label="CEP"
                name="cep"
                value={formData.cep}
                onChange={(e) => setFormData({ ...formData, cep: maskCEP(e.target.value) })}
              />
            </div>
          </section>

          {/* CHECKBOX DESEMPREGADO */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={desempregado}
              onChange={() => setDesempregado(!desempregado)}
            />
            <span className="text-[#7C8DB0]">Sou desempregado</span>
          </div>

          {/* SEÇÃO 4: ENDEREÇO COMERCIAL */}
          {!desempregado && (
            <section>
              <h2 className="text-lg font-semibold text-[#6E7491] border-b pb-2 mb-4">Endereço Comercial</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="CEP Comercial"
                  name="cepCom"
                  value={formData.cepCom}
                  onChange={(e) => setFormData({ ...formData, cepCom: maskCEP(e.target.value) })}
                />
                <Input label="Rua" name="ruaCom" value={formData.ruaCom} onChange={handleChange} />
                <Input
                  label="Número"
                  name="numeroCom"
                  value={formData.numeroCom}
                  onChange={(e) => setFormData({ ...formData, numeroCom: maskNumero(e.target.value) })}
                />
                <Input label="Bairro" name="bairroCom" value={formData.bairroCom} onChange={handleChange} />
                <Input label="Cidade" name="cidadeCom" value={formData.cidadeCom} onChange={handleChange} />
                <Input
                  label="Estado"
                  name="estadoCom"
                  maxLength={2}
                  value={formData.estadoCom}
                  onChange={(e) =>
                    setFormData({ ...formData, estadoCom: e.target.value.toUpperCase() })
                  }
                />
              </div>
            </section>
          )}

          {/* SEÇÃO 5: CHECKBOXES */}
          <section className="flex flex-col gap-2 mt-4">
            <label className="flex gap-2 text-sm text-[#7C8DB0]">
              <input type="checkbox" checked={check1} onChange={(e) => setCheck1(e.target.checked)} />
              Concordo com os termos e condições
            </label>
            <label className="flex gap-2 text-sm text-[#7C8DB0]">
              <input type="checkbox" checked={check2} onChange={(e) => setCheck2(e.target.checked)} />
              Desejo receber promoções
            </label>
          </section>

          {/* BOTÃO FINAL */}
          <button
            className="w-full bg-[#605DEC] text-white rounded-lg py-3 font-medium mt-4 hover:bg-[#4b46c2] transition"
            onClick={submitInputs}
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
