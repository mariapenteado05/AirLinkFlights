import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />; // se não estiver logado

  if (!allowedRoles.includes(user.role))
    return <Navigate to="/nao-autorizado" />; // acesso negado

  return children;
};

export default ProtectedRoute;
