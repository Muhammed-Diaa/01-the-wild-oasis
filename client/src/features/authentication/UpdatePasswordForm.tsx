import Button from "../../ui/Button";

import { Form, FormRow, Input, Label } from "../../ui/UserInput";
import { IUDApiResponse } from "../../utils/ApiResponses";
import { useUpdateUser } from "../../services/apiAuth";
import styled from "styled-components";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;
const Div = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;

  & input:checked + .label {
    background-color: var(--color-brand-500);
  }
  & input:checked + .label::before {
    content: "\\2713";
    font-size: 1.5rem;
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .name {
    font-weight: 600;
    font-size: medium;
  }
  & .label {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 20;
    background-color: white;
    padding: 0 1px;
    border: 1px solid black;
    border-radius: 3px;
    width: 23px;
    height: 23px;
  }
  & input {
    opacity: 0;
  }
`;

const UpdatePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfiremPassword] = useState<string>();

  const { mutate: updateUser, isPending } = IUDApiResponse({
    queryKey: ["user"],
    FN: useUpdateUser,
    FunctionName: "updateUser",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    if (password !== confirmPassword)
      return toast.error("Password need to match");

    updateUser(
      { password },
      {
        onSuccess: () => {
          setPassword("");
          setConfiremPassword("");
          setShowPassword(false);
        },
      }
    );
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <FormRow>
        <Input
          placeholder=" "
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          disabled={isPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>
      </FormRow>
      <FormRow>
        <Input
          placeholder=" "
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isPending}
          value={confirmPassword}
          onChange={(e) => setConfiremPassword(e.target.value)}
        />
        <Label htmlFor="passwordConfirm">Confirm password</Label>
      </FormRow>
      <Div>
        <input
          id="showPassword"
          onChange={(e) => setShowPassword(e.target.checked)}
          type="checkbox"
        />

        <label className="label" htmlFor="showPassword"></label>
        <label className="name" htmlFor="showPassword">
          show password
        </label>
      </Div>
      <ButtonContainer>
        <Button
          onClick={() => {
            setShowPassword(false);
            setPassword("");
            setConfiremPassword("");
          }}
          type="reset"
          $variation="secondary"
        >
          Cancel
        </Button>
        <Button disabled={isPending}>Update password</Button>
      </ButtonContainer>
    </Form>
  );
};
export default UpdatePasswordForm;
