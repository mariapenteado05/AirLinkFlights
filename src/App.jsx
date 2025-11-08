import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer, Navbar } from "./components";
import {
  Confirm,
  FlightExplore,
  PassengerInfo,
  Payment,
  SeatSelect,
  SignUp,
  Support,
  User,
  Home,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto">
        {/* Navbar */}
        <Navbar />

        {/* Conteúdo das rotas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/user" element={<User />} />
          <Route path="/explore" element={<FlightExplore />} />
          <Route path="/passenger-info" element={<PassengerInfo />} />
          <Route path="/seat-selection" element={<SeatSelect />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Rota padrão */}
          <Route
            path="*"
            element={
              <div className="p-8 text-center text-[#605DEC] font-semibold">
                Página não encontrada.
              </div>
            }
          />
        </Routes>

        {/* Footer fixo no final */}
        <Footer />

        {/* Toast (mensagens de sucesso, erro etc.) */}
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
};

export default App;
