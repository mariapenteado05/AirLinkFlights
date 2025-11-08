import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = ({ signin, setSignin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // impede recarregar a página

    if (username.trim() === "" || senha.trim() === "") {
      toast.warning("Por favor, preencha todos os campos!");
      return;
    }

    toast.success("Login realizado com sucesso!");
    setTimeout(() => {
      setSignin(false); 
      navigate("/"); // redireciona para home
    }, 1000); // pequeno delay para a toast aparecer
  };

  const handleGoToSignUp = (e) => {
    e.preventDefault(); // impede reload
    setSignin(false); // fecha o modal
    navigate("/signup"); // vai para página de cadastro
  };

  return (
    <div className="absolute top-36 right-0 left-0 m-auto z-20 bg-white shadowCard w-[310px] sm:w-[468px] md:w-[568px] rounded px-8 py-6 flex flex-col gap-6 scaleUp">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <h1 className="text-[#6E7491] text-[20px] sm:text-[24px] font-bold">
          Faça login! - AirLink
        </h1>
        <MdOutlineClose
          className="text-[#6E7491] cursor-pointer"
          onClick={() => setSignin(false)} // fecha o modal
        />
      </header>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="input"
        />

        {/* BOTÃO LOGIN */}
        <button
          type="submit"
          className="w-full bg-[#605DEC] text-[#FAFAFA] rounded py-3 hover:opacity-90 transition"
        >
          Entrar
        </button>
      </form>

      {/* DIVISÓRIA */}
      <div className="flex items-center justify-center gap-2">
        <div className="w-full border-t border-[#A1B0CC]" />
        <p className="text-[#7C8DB0] text-[18px]">ou</p>
        <div className="w-full border-t border-[#A1B0CC]" />
      </div>

      {/* BOTÃO PARA CADASTRO */}
      <button
        className="w-full flex gap-2 items-center justify-center border border-[#605DEC] rounded p-3 hover:bg-[#f2f2ff] transition"
        onClick={handleGoToSignUp}
      >
        <p className="text-[#605CDE] text-[16px]">
          Não tem uma conta? Cadastre-se!
        </p>
      </button>
    </div>
  );
};

export default Signin;
