import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  background-color: white;
  padding: 3.6rem 2.4rem;
  border-radius: 10px;
`;
const FormRow = styled.div`
  position: relative;
  object-fit: cover;
`;
const ImageForm = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  & label {
    padding-left: 1rem;
    font-weight: bold;
  }
`;
const Input = styled.input`
  padding: 8px 18px;
  border: 2px black solid;
  border-radius: 30px;
  width: 300px;
  font-weight: 500;
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -16px;
    left: 33px;
    color: #000000;
    font-weight: 700;
    transition: all 0.5s ease-in;
    padding: 0 5px;

    background: linear-gradient(to bottom, white 75%, rgb(0, 0, 0, 0) 50%);
  }
`;

const Label = styled.label`
  position: absolute;
  background-color: white;
  top: 10px;
  left: 23px;
  transition: all 0.3s ease-in;
  cursor: text;
  color: #cacacaf9;
`;

const Button = styled.button`
  padding: 8px 18px;
  border: none;
  border-radius: 30px;
  background-color: white;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

export { Form, FormRow, Input, Label, Button, ImageForm };
