import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div>Cerrgando...</div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;
