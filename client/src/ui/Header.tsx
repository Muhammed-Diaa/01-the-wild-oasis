import styled from "styled-components";

import { useGetUser, useLogout } from "../services/apiAuth";
import { MdLogout } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const HeaderSyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;

  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-500);
    cursor: pointer;
  }
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & img {
    border-radius: 50%;
    aspect-ratio: 1;
    object-fit: cover;
    width: 35px;
    height: 35px;
  }
`;

function Header() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useGetUser();

  const guest = user?.user_metadata;

  return (
    <HeaderSyled>
      <UserContainer>
        <img
          src={guest?.avatar === "" ? "/img/default-user.jpg" : guest?.avatar}
          alt="avatar"
        />{" "}
        <span>{guest?.fullName}</span>
      </UserContainer>
      <CiUser onClick={() => navigate("/account")} />
      <MdLogout onClick={() => logout()} />
    </HeaderSyled>
  );
}

export default Header;
