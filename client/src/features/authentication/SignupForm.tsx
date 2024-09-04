import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { Form, FormRow, Input, Label } from "../../ui/UserInput";
import { useSignUp } from "../../services/apiAuth";
import { UserAuth } from "../../utils/ApiResponses";
import styled from "styled-components";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Modal from "../../context/Modal";
import OtpVerification from "./VerifyOtp";

const Verify = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  & svg {
    font-size: 3rem;
    cursor: pointer;
  }
`;
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

const SignUpForm = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [user, setUser] = useState<{} | null>(null);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "acer.net2",
    passwordConfirm: "acer.net2",
  });

  const { name, email, password, passwordConfirm } = inputs;

  const { mutate: signup } = UserAuth({
    FN: useSignUp,
    loading: "signup",
    success: "verify your email",
    error: "please try again later",
  });

  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirm)
      return toast.error("Please fill all the fields");
    if (!/\S+@\S+\.\S+/.test(email))
      return toast.error(`Please provide a valid email address`);
    if (password.length < 8)
      return toast.error(`Password must have at least 8 characters`);
    if (
      !/[a-zA-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[!@#$%^&.*]/.test(password)
    )
      return toast.error(
        `Password must have letters, special characters and numbers`
      );
    if (password !== passwordConfirm)
      return toast.error("Password need to match");

    signup(
      { fullName: name, email: email, password: password },
      {
        onSuccess: (user) => {
          console.log(user);
          setUser(user as {});
        },
      }
    );
  };

  return (
    <Modal>
      <Form onSubmit={handleSignUpSubmit} action="#">
        <Verify>
          <h1>Create Account</h1>
        </Verify>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
        <FormRow>
          <Input
            value={inputs.name}
            onChange={(e) =>
              setInputs((rest) => ({ ...rest, name: e.target.value }))
            }
            placeholder=" "
            type="text"
            id="name"
          />
          <Label htmlFor="name">Name</Label>
        </FormRow>
        <FormRow>
          <Input
            value={inputs.email}
            onChange={(e) =>
              setInputs((rest) => ({ ...rest, email: e.target.value }))
            }
            placeholder=" "
            type="text"
            id="emailup"
          />
          <Label htmlFor="emailup">Email</Label>
        </FormRow>
        <FormRow>
          <Input
            value={inputs.password}
            onChange={(e) =>
              setInputs((rest) => ({ ...rest, password: e.target.value }))
            }
            placeholder=" "
            type={!seePassword ? "password" : "text"}
            id="passwordup"
          />
          <Label htmlFor="passwordup">Password</Label>
          <EyeIcon
            type="button"
            onClick={() => setSeePassword((prev) => !prev)}
          >
            {seePassword ? <IoMdEye /> : <IoMdEyeOff />}
          </EyeIcon>
        </FormRow>
        <FormRow>
          <Input
            value={inputs.passwordConfirm}
            onChange={(e) =>
              setInputs((rest) => ({
                ...rest,
                passwordConfirm: e.target.value,
              }))
            }
            placeholder=" "
            type="password"
            id="confirmpassword"
          />
          <Label htmlFor="confirmpassword">Confirm Password</Label>
        </FormRow>

        <Modal.Open opens={"OTP"}>
          <Button>Sign Up</Button>
        </Modal.Open>
      </Form>
      {user && (
        <Modal.Window name={"OTP"}>
          <OtpVerification email={email} />
        </Modal.Window>
      )}
    </Modal>
  );
};

export default SignUpForm;
