import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const onlyNumbers = (value) => value.replace(/\D/g, "");

const maskCPF = (raw) => {
  const value = onlyNumbers(raw);
  return value
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .substring(0, 14);
};

const maskTelefone = (raw) => {
  const value = onlyNumbers(raw);
  return value
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .substring(0, 15);
};

const maskCEP = (raw) => {
  const value = onlyNumbers(raw);
  return value.replace(/(\d{5})(\d)/, "$1-$2").substring(0, 9);
};

const maskRG = (raw) => {
  const value = onlyNumbers(raw);
  return value
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1})$/, "$1-$2")
    .substring(0, 12);
};

const maskNumero = (raw) => {
  const value = onlyNumbers(raw);
  return value.substring(0, 6);
};

/**
 * MaskedInput
 * props:
 *  - valueRaw: string (raw, only numbers when relevant)
 *  - onChangeRaw: (newRaw) => void
 *  - maskFn: (raw) => formatted string
 *  - other props passed to <input>
 *
 * This component displays maskFn(valueRaw) as value and calls onChangeRaw with new raw (onlyNumbers)
 * It keeps a ref and moves cursor to the end after each change (solves the "1 char" problem).
 */
const MaskedInput = ({ valueRaw = "", onChangeRaw, maskFn, ...inputProps }) => {
  const ref = useRef(null);
  const formatted = maskFn ? maskFn(valueRaw) : valueRaw;

  const handleChange = (e) => {
    // Derive raw from the input's value (user can paste formatted or raw)
    const newRaw = onlyNumbers(e.target.value);
    onChangeRaw(newRaw);

    // after state update React will re-render; move caret to end via setTimeout
    // (simple and reliable for this use-case)
    setTimeout(() => {
      try {
        const el = ref.current;
        if (el) {
          const len = (maskFn ? maskFn(newRaw) : newRaw).length;
          el.setSelectionRange(len, len);
        }
      } catch (err) {
        // ignore
      }
    }, 0);
  };

  return (
    <input
      ref={ref}
      {...inputProps}
      value={formatted}
      onChange={handleChange}
      inputMode="numeric"
      // prevent autocomplete weirdness for numeric masked fields
      autoComplete="off"
    />
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-[#6E7491] text-sm font-medium">{label}</label>}
    <input
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#605DEC] transition"
      {...props}
    />
  </div>
);

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "", // store raw digits
    usuario: "",
    senha: "",
    dataNascimento: "",
    cpf: "", // raw digits
    rg: "", // raw digits
    dataEmissao: "",
    orgaoEmissor: "",
    tipo: "",
    logradouro: "",
    numero: "", // raw digits
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "",
    cep: "", // raw digits
    localTrabalho: "",
    cepCom: "", // raw digits
    ruaCom: "",
    numeroCom: "", // raw digits
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
    // Consider comercial fields only when not desempregado
    const keysToCheck = Object.keys(formData).filter((k) => {
      if (desempregado) {
        // ignore commercial fields when desempregado
        return !["cepCom", "ruaCom", "numeroCom", "bairroCom", "cidadeCom", "estadoCom"].includes(k);
      }
      return true;
    });
    const empty = keysToCheck.some((k) => (formData[k] + "").trim() === "");
    if (empty) {
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

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center py-10">
      <div className="bg-white shadow-lg w-[90%] max-w-[800px] rounded-xl px-8 py-10 flex flex-col gap-8">
        <header className="flex items-center justify-center border-b pb-4">
          <h1 className="text-[#605DEC] text-2xl font-bold">Cadastre-se!</h1>
        </header>

        <form className="flex flex-col gap-6" onSubmit={submitInputs}>
          {/* DADOS PESSOAIS */}
          <section>
            <h2 className="text-lg font-semibold text-[#6E7491] border-b pb-2 mb-4">Dados Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome completo" name="nome" value={formData.nome} onChange={handleChange} />
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
              {/* telefone masked */}
              <div className="flex flex-col gap-1">
                <label className="text-[#6E7491] text-sm font-medium">Telefone</label>
                <MaskedInput
                  name="telefone"
                  valueRaw={formData.telefone}
                  onChangeRaw={(raw) => setFormData({ ...formData, telefone: raw })}
                  maskFn={maskTelefone}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <Input label="Nome de usuário" name="usuario" value={formData.usuario} onChange={handleChange} />
              <Input label="Senha" name="senha" type="password" value={formData.senha} onChange={handleChange} />
              <Input label="Data de nascimento" name="dataNascimento" type="date" value={formData.dataNascimento} onChange={handleChange} />
            </div>
          </section>

          {/* DOCUMENTOS */}
          <section>
            <h2 className="text-lg font-semibold text-[#6E7491] border-b pb-2 mb-4">Documentos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[#6E7491] text-sm font-medium">CPF</label>
                <MaskedInput
                  name="cpf"
                  valueRaw={formData.cpf}
                  onChangeRaw={(raw) => setFormData({ ...formData, cpf: raw })}
                  maskFn={maskCPF}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[#6E7491] text-sm font-medium">RG</label>
                <MaskedInput
                  name="rg"
                  valueRaw={formData.rg}
                  onChangeRaw={(raw) => setFormData({ ...formData, rg: raw })}
                  maskFn={maskRG}
                  placeholder="00.000.000-0"
                />
              </div>

              <Input label="Data de emissão" name="dataEmissao" type="date" value={formData.dataEmissao} onChange={handleChange} />
              <Input label="Órgão emissor" name="orgaoEmissor" value={formData.orgaoEmissor} onChange={handleChange} />
            </div>
          </section>

          {/* ENDEREÇO RESIDENCIAL */}
          <section>
            <h2 className="text-lg font-semibold text-[#6E7491] border-b pb-2 mb-4">Endereço Residencial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Tipo" name="tipo" value={formData.tipo} onChange={handleChange} />
              <Input label="Logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label className="text-[#6E7491] text-sm font-medium">Número</label>
                <MaskedInput
                  name="numero"
                  valueRaw={formData.numero}
                  onChangeRaw={(raw) => setFormData({ ...formData, numero: raw })}
                  maskFn={maskNumero}
                  placeholder="Número"
                />
              </div>
              <Input label="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
              <Input label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
              <Input label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
              <Input label="Estado" name="estado" value={formData.estado} onChange={handleChange} />
              <Input label="País" name="pais" value={formData.pais} onChange={handleChange} />
              <div className="flex flex-col gap-1">
                <label className="text-[#6E7491] text-sm font-medium">CEP</label>
                <MaskedInput
                  name="cep"
                  valueRaw={formData.cep}
                  onChangeRaw={(raw) => setFormData({ ...formData, cep: raw })}
                  maskFn={maskCEP}
                  placeholder="00000-000"
                />
              </div>
            </div>
          </section>

          {/* DESEMPREGADO */}
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={desempregado} onChange={() => setDesempregado(!desempregado)} />
            <span className="text-[#7C8DB0]">Sou desempregado</span>
          </div>

          {/* ENDEREÇO COMERCIAL */}
          {!desempregado && (
            <section>
              <h2 className="text-lg font-semibold text-[#6E7491] border-b pb-2 mb-4">Endereço Comercial</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[#6E7491] text-sm font-medium">CEP Comercial</label>
                  <MaskedInput
                    name="cepCom"
                    valueRaw={formData.cepCom}
                    onChangeRaw={(raw) => setFormData({ ...formData, cepCom: raw })}
                    maskFn={maskCEP}
                    placeholder="00000-000"
                  />
                </div>

                <Input label="Rua" name="ruaCom" value={formData.ruaCom} onChange={handleChange} />

                <div className="flex flex-col gap-1">
                  <label className="text-[#6E7491] text-sm font-medium">Número</label>
                  <MaskedInput
                    name="numeroCom"
                    valueRaw={formData.numeroCom}
                    onChangeRaw={(raw) => setFormData({ ...formData, numeroCom: raw })}
                    maskFn={maskNumero}
                    placeholder="Número"
                  />
                </div>

                <Input label="Bairro" name="bairroCom" value={formData.bairroCom} onChange={handleChange} />
                <Input label="Cidade" name="cidadeCom" value={formData.cidadeCom} onChange={handleChange} />
                <Input
                  label="Estado"
                  name="estadoCom"
                  maxLength={2}
                  value={formData.estadoCom}
                  onChange={(e) => setFormData({ ...formData, estadoCom: e.target.value.toUpperCase() })}
                />
              </div>
            </section>
          )}

          {/* CHECKBOXES */}
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

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full bg-[#605DEC] text-white rounded-lg py-3 font-medium mt-4 hover:bg-[#4b46c2] transition"
            >
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
