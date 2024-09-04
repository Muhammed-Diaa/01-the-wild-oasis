import { useState } from "react";
import styled, { css } from "styled-components";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  /* overflow: hidden; */
  width: 768px;
  max-width: 100%;
  min-height: 450px;
`;
const FormContainer = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  transition: all 0.6s ease-in-out;
  transform: ${(props) =>
    props.$active ? "translateX(100%)" : "translateX(0)"};
  transition: transform 0.6s ease-in-out;
`;

const OverlayContainer = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  transform: ${(props) =>
    props.$active ? "translateX(-100%)" : "translateX(0)"};
  z-index: 100;
`;
const Overlay = styled.div<{ $active: boolean }>`
  background: linear-gradient(
    to right,
    var(--color-brand-200),
    var(--color-brand-600)
  );

  color: #ffffff;

  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: ${(props) =>
    props.$active ? "translateX(50%)" : "translateX(0)"};
  transition: transform 0.6s ease-in-out;
`;
const OverlayPanel = styled.div<{ $side: "left" | "right"; $active: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: ${(props) =>
    props.$side === "left" ? "translateX(-20%)" : "translateX(0)"};
  transition: transform 0.6s ease-in-out;
  ${(props) =>
    props.$side === "left" &&
    css`
      left: 0;
      transform: ${props.$active ? "translateX(0)" : "translateX(-20%)"};
    `}
  ${(props) =>
    props.$side === "right" &&
    css`
      right: 0;
      transform: ${props.$active ? "translateX(3%)" : "translateX(0)"};
    `}
    & p {
    word-break: auto-phrase;
  }
  & button {
    background-color: transparent;
    border-color: #ffffff;
    border-radius: 60px;
    cursor: pointer;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin-top: 16px;
    &:active {
      transform: scale(0.95);
    }
    &:focus {
      outline: none;
    }
  }
`;
const Footer = styled.footer`
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
  p {
    margin: 10px 0;
  }
  i {
    color: red;
  }
  a {
    color: #3c97bf;
    text-decoration: none;
  }
`;

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleSignIn = () => setIsSignUp(false);
  const handleToggleSignUP = () => setIsSignUp(true);

  return (
    <>
      <Container className={isSignUp ? "right-panel-$active" : ""}>
        {!isSignUp ? (
          <FormContainer $active={isSignUp} children={<LoginForm />} />
        ) : (
          <FormContainer $active={isSignUp} children={<SignUpForm />} />
        )}
        <OverlayContainer $active={isSignUp}>
          <Overlay $active={isSignUp}>
            <OverlayPanel $side="left" $active={isSignUp}>
              <img src="/img/icon.png" alt="" />
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={handleToggleSignIn}>Sign In</button>
            </OverlayPanel>
            <OverlayPanel $side="right" $active={!isSignUp}>
              <img src="/img/icon.png" alt="" />
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={handleToggleSignUP}>Sign Up</button>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
      <Footer>
        <p>
          Created by AhmadDiaa - I just wanna said I love you all, visit our
          GitHub{" "}
          <a target="_blank" href="https://github.com/Muhammed-Diaa">
            here
          </a>
          .
        </p>
      </Footer>
    </>
  );
};
export default Login;
