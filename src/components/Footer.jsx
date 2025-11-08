import { Link, useLocation } from "react-router-dom";
import { facebook, instagram, twitter } from "../assets/icons";
import { AirLink, AirLinkImg } from "../assets/logo";

const Footer = () => {
  const location = useLocation();

  // mesma função usada no Navbar
  const loactionPath = (route) => {
    return route === location.pathname;
  };

  return (
    <>
      <div className="mt-40 flex flex-col gap-5 px-8">
        <div className="flex justify-between items-start flex-col md:flex-row gap-7">
          <div className="flex justify-start items-start">
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

          <ul className="flex flex-col items-start justify-start gap-3">
            <Link
              to="/support"
              className={`text-base hover:text-[#605DEC] transition-all duration-200 ${
                loactionPath("/support") && "text-[#605DEC]"
              }`}
            >
              <li>Suporte</li>
            </Link>
          </ul>
        </div>

        <div className="border-t-2 border-[#CBD4E6] py-8 flex justify-end items-center">
          <div className="flex items-center justify-center gap-3">
            <img
              src={twitter}
              alt="twitter"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
            <img
              src={instagram}
              alt="instagram"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
            <img
              src={facebook}
              alt="facebook"
              className="cursor-pointer object-cover w-5 h-5 sm:w-7 sm:h-7"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
