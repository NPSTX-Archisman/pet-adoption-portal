import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

interface Props {
  requiredRole: string;
}

export default function ProtectedRoute({
  requiredRole,
}: Props) {

  const { role } = useAuth();

  if (role !== requiredRole) {

    return (
      <Navigate to="/" />
    );
  }

  return <Outlet />;
}