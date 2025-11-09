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
  AdminDashboard,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./ProtectedRoute";

const App = () => {
  return (
    <div className="font-Nunito overflow-hidden max-w-[1440px] mx-auto bg-[#FAFAFA]">
      {/* Navbar */}
      <Navbar />

      {/* Conteúdo das rotas */}
      <div className="min-h-[80vh]">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/explore" element={<FlightExplore />} />
          <Route path="/passenger-info" element={<PassengerInfo />} />
          <Route path="/seat-selection" element={<SeatSelect />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protegidas */}
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dash"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

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
      </div>

      {/* Footer fixo no final */}
      <Footer />

      {/* Toast */}
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
  );
};

export default App;
