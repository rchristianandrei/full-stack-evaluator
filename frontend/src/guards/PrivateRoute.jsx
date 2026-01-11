import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet></Outlet>;
};

export default PrivateRoute;
