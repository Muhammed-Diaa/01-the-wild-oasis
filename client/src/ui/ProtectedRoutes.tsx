import { ReactNode, useEffect } from "react";
import { useGetUser } from "../services/apiAuth";

import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useGetUser();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, isPending]);

  if (isPending) return <Loader />;

  return children;
};
export default ProtectedRoutes;
