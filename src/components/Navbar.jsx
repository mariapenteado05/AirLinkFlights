import { Link, useLocation } from "react-router-dom";
import { AirLink, AirLinkImg } from "../assets/logo";
import { MdOutlineClose } from "react-icons/md";
import { BiMenuAltLeft } from "react-icons/bi";
import { useState } from "react";
import { Signin } from "../container";
import { useAuth } from "../context/AuthContext"; // 🔹 Importa o contexto

const Navbar = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [signin, setSignin] = useState(false);
  const { user, logout } = useAuth(); // 🔹 Usuário logado e logout

  const locationPath = (route) => route === location.pathname;

  return (
    <>
      <nav className="w-full flex flex-row items-center justify-between px-5 py-4 relative">
        {/* ==== LOGO E MENU MOBILE ==== */}
        <div className="flex items-center justify-center gap-3">
          {/* ==== MENU HAMBÚRGUER ==== */}
          <div className="relative md:hidden flex items-center">
            {toggle ? (
              <MdOutlineClose
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(false)}
              />
            ) : (
              <BiMenuAltLeft
                className="w-7 h-7 text-[#605DEC] cursor-pointer"
                onClick={() => setToggle(true)}
              />
            )}
            {toggle && (
              <ul className="absolute w-40 z-10 h-fit bg-[#FFFFFF] shadow-xl top-14 left-0 text-[#7C8DB0] flex flex-col gap-2 items-start p-4 scaleUp">
                <Link
                  to="/"
                  className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                    locationPath("/") && "text-[#605DEC]"
                  }`}
                >
                  <li>Home</li>
                </Link>
                <Link
                  to="/support"
                  className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                    locationPath("/support") && "text-[#605DEC]"
                  }`}
                >
                  <li>Suporte</li>
                </Link>

                {/* 🔹 Só o usuário comum vê a página de usuário */}
                {user?.role === "user" && (
                  <Link
                    to="/user"
                    className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                      locationPath("/user") && "text-[#605DEC]"
                    }`}
                  >
                    <li>Página do Usuário</li>
                  </Link>
                )}

                {/* 🔹 Só o admin vê o painel */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin-dash"
                    className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                      locationPath("/admin-dash") && "text-[#605DEC]"
                    }`}
                  >
                    <li>Administração</li>
                  </Link>
                )}
              </ul>
            )}
          </div>

          {/* ==== LOGO ==== */}
          <img
            src={AirLink}
            alt="AirLink"
            className="w-[150px] h-[45px] md:w-[200px] md:h-[60px] object-contain"
          />
          <img
            src={AirLinkImg}
            alt="AirLinkImg"
            className="w-[200px] h-[60px] md:w-[200px] md:h-[60px] object-contain"
          />
        </div>

        {/* ==== BOTÃO MOBILE ==== */}
        <div className="block md:hidden">
          {!user ? (
            <button
              className="bg-[#605DEC] py-2 px-4 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white transition-all duration-200"
              onClick={() => setSignin(!signin)}
            >
              Entrar
            </button>
          ) : (
            <button
              className="bg-[#E74C3C] py-2 px-4 rounded-[5px] text-white border border-[#E74C3C] hover:bg-white hover:text-[#E74C3C] transition-all duration-200"
              onClick={logout}
            >
              Sair
            </button>
          )}
          {signin && <Signin signin={signin} setSignin={setSignin} />}
        </div>

        {/* ==== MENU DESKTOP ==== */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8 text-[#7C8DB0]">
            <Link
              to="/"
              className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                locationPath("/") && "text-[#605DEC]"
              }`}
            >
              <li>Home</li>
            </Link>
            <Link
              to="/support"
              className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                locationPath("/support") && "text-[#605DEC]"
              }`}
            >
              <li>Suporte</li>
            </Link>

            {/* 🔹 Só o usuário vê essa */}
            {user?.role === "user" && (
              <Link
                to="/user"
                className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                  locationPath("/user") && "text-[#605DEC]"
                }`}
              >
                <li>Página do Usuário</li>
              </Link>
            )}

            {/* 🔹 Só o admin vê essa */}
            {user?.role === "admin" && (
              <Link
                to="/admin-dash"
                className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                  locationPath("/admin-dash") && "text-[#605DEC]"
                }`}
              >
                <li>Administração</li>
              </Link>
            )}
          </ul>

          {/* ==== BOTÃO LOGIN/LOGOUT ==== */}
          {!user ? (
            <button
              className="bg-[#605DEC] py-2 px-5 rounded-[5px] border-2 border-[#605DEC] text-base text-[#FAFAFA] hover:text-[#605DEC] hover:bg-white transition-all duration-200"
              onClick={() => setSignin(!signin)}
            >
              Entrar
            </button>
          ) : (
            <button
              className="py-2 px-5 rounded-[5px] border border-[#E74C3C] bg-[#E74C3C] text-white hover:bg-white hover:text-[#E74C3C] transition-all duration-200"
              onClick={logout}
            >
              Sair
            </button>
          )}

          {signin && <Signin signin={signin} setSignin={setSignin} />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
