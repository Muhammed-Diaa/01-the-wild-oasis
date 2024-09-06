import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import { Form, FormRow } from "../../ui/UserInput";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabase";

const OtpVerificationWrapper = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ResendOtpButton = styled.div<{ $active: boolean }>`
  & :focus {
    outline: none;
  }
  ${({ $active }) =>
    $active &&
    css`
      opacity: 0.5;
      cursor: none;
    `}

  all: unset;
  font-size: small;
  cursor: pointer;
  color: var(--color-brand-600);
  border: none;
  outline: none;
  background: none;
`;

const P = styled.p`
  text-align: center;
  & span {
    color: var(--color-brand-600);
    font-weight: 600;
  }
`;

const OTPinput = styled.div`
  display: grid;
  gap: 1rem;
  height: 60px;
  grid-template-columns: repeat(6, 45px);
  input {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
    text-align: center;
    font-size: large;
  }
`;

const OtpVerification = ({ email: initialEmail }: { email: string }) => {
  const [otp, setOtp] = useState("");
  const [email] = useState(initialEmail || "");
  const [counter, setCounter] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (counter > 0 && isResending) {
      timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else if (counter === 0) {
      setIsResending(false);
      setCounter(60);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [counter, isResending]);

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedOtp = otp.trim();

    if (!trimmedOtp || !email) return toast.error("Please fill in both fields");

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: trimmedOtp,
        type: "signup",
      });

      if (error) throw new Error(error.message);

      toast.success("OTP verified successfully!");
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
    setIsSubmitting(false);
  };
  const handleResendOtp = async () => {
    if (!email) return toast.error("Please enter your email to resend OTP");

    try {
      setIsResending(true);

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      });
      if (error) throw new Error(error.message);

      toast.success("OTP resent successfully!");
      setCounter(60);
    } catch (error: { message: string }) {
      toast.error(error.message);
    } finally {
      setIsResending(false);
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (index === 0) return;
      // Move focus to previous input if current is empty and not the first input
      inputRefs.current[index - 1].focus();
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp.join(""));

    // Move to next input if not at the end
    if (index < 5 && e.target.value) {
      inputRefs.current[index + 1].focus();
    }
    if (newOtp.join("").length === 6 && formRef.current) {
      formRef.current.requestSubmit();
      setIsSubmitting(true);
    }
  };

  return (
    <OtpVerificationWrapper>
      <h2>OTP Verification</h2>
      <Form ref={formRef} onSubmit={handleOtpSubmit}>
        <FormRow>
          <P>
            We will send you a verification token to
            <br />
            <span>{email}</span>
          </P>
        </FormRow>
        <OTPinput>
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              value={otp[index] || ""}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el!)}
              placeholder=" "
              type="text"
              id={`otp-${index}`}
              maxLength={1}
              disabled={isSubmitting}
            />
          ))}
        </OTPinput>
        <ResendOtpButton $active={isResending} onClick={handleResendOtp}>
          {isResending ? `Resend OTP (${counter})` : "Resend OTP"}
        </ResendOtpButton>
        <Button type="submit">Verify OTP</Button>
      </Form>
    </OtpVerificationWrapper>
  );
};

export default OtpVerification;
