import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (!user) {
    // não logado
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    // logado, mas sem permissão
    return <Navigate to="/" replace />;
  }

  // acesso permitido
  return children;
};
