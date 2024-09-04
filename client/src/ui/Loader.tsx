import styled, { keyframes } from "styled-components";

const eyeMove = keyframes`
            0%  , 10% {     background-position: 0px 0px}
            13%  , 40% {     background-position: -15px 0px}
            43%  , 70% {     background-position: 15px 0px}
            73%  , 90% {     background-position: 0px 15px}
            93%  , 100% {     background-position: 0px 0px}
          `;
const blink = keyframes`
            0%  , 10% , 12% , 20%, 22%, 40%, 42% , 60%, 62%,  70%, 72% , 90%, 92%, 98% , 100%
            { height: 48px}
            11% , 21% ,41% , 61% , 71% , 91% , 99%
            { height: 18px}`;

const Loaderr = styled.span`
  position: relative;
  width: 108px;
  display: flex;
  justify-content: space-between;

  &::after,
  &::before {
    content: "";
    display: inline-block;
    width: 48px;
    height: 48px;
    background-color: var(--color-grey-100);
    background-image: radial-gradient(circle 14px, #0d161b 100%, transparent 0);
    background-repeat: no-repeat;
    border-radius: 50%;
    animation: ${eyeMove} 10s infinite, ${blink} 10s infinite;
  }
`;
const FullPage = styled.div`
  width: 100%;
  height: 100svh;
  display: grid;
  place-items: center;
`;

const Loader = () => {
  return (
    <FullPage>
      <Loaderr />
    </FullPage>
  );
};

export default Loader;
