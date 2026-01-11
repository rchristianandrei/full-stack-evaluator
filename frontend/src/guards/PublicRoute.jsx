import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
