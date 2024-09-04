import { UserAuth } from "../../utils/ApiResponses";
import toast from "react-hot-toast";
import { Form, FormRow, Input, Label } from "../../ui/UserInput";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const EyeIcon = styled.button`
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 11px;
  width: 27px;
  height: 20px;
  background: inherit;
  border: none;
  border-radius: 50%;
  &:focus {
    outline: none;
  }
`;

const SignInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("acer.net2");
  const [seePassword, setSeePassword] = useState(false);

  const { mutate: login, isPending } = UserAuth({
    FN: useLogin,
    loading: "login",
    success: "Welcome Back",
    error: "Email or Password is incorrect",
    onSuccess: () => {
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    },
  });

  const handleSignInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all the fields");
    login({ email, password });
  };
  return (
    <>
      <Form onSubmit={handleSignInSubmit} action="#">
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        <FormRow>
          <Input
            placeholder=" "
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
          <Label htmlFor="email">Email</Label>
        </FormRow>
        <FormRow>
          <Input
            placeholder=" "
            type={seePassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />
          <Label htmlFor="password">Password</Label>
          <EyeIcon
            type="button"
            onClick={() => setSeePassword((prev) => !prev)}
          >
            {seePassword ? <IoMdEye /> : <IoMdEyeOff />}
          </EyeIcon>
        </FormRow>

        <Button disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Sign In"}
        </Button>
      </Form>
    </>
  );
};

export default SignInForm;
