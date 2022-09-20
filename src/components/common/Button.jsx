import React from "react";
import styled from "styled-components";

function Button(props) {
  return (
    <BTN {...props}>
      {props.label}
      {props.icon && <span>{props.icon}</span>}
    </BTN>
  );
}

export default Button;

const BTN = styled.button`
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.1em;
  border: solid 1px #fff;
  border-radius: 4px;
  cursor: pointer;
`;
