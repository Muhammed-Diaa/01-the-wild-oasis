import styled from "styled-components";
import UserForm from "../features/authentication/UserForm";
import { useEffect } from "react";
import { useGetUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../ui/Loader";

const LoginLayout = styled.main`
  min-height: 100vh;

  display: grid;
  /* grid-template-columns: 48rem; */
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-100);
`;

function Login() {
  const { isPending, isAuthenticated } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(-1);
  });
  if (isPending) return <Loader />;

  return (
    <LoginLayout>
      <UserForm />
    </LoginLayout>
  );
}

export default Login;
