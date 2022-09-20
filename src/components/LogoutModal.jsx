import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

function LogoutModal({ handleLogOut }, ref) {
  return (
    <Dialog ref={ref}>
      <UL>
        <LI>
          <p>Profile</p>
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </LI>
        <LI onClick={handleLogOut}>
          <p>Log Out</p>
          <span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
        </LI>
      </UL>
    </Dialog>
  );
}

export default React.forwardRef(LogoutModal);

const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 0;
  transform: translate(-85%, 100%);
  margin-top: 30px;
  z-index: 99999;
  width: max-content;
`;

const UL = styled.ul`
  list-style: none;
  background: #404040;
  border-radius: 3px;
  width: 120px;
`;

const LI = styled.li`
  font-size: 15px;
  font-weight: 600;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;

  &:hover {
    background: #fff;
    color: #000;
  }
`;
