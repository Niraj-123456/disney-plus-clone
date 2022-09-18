import React from "react";
import styled from "styled-components";

function InputField(props) {
  return (
    <Container>
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input type="text" id={props.id} placeholder={props.placeholder} />
    </Container>
  );
}

export default InputField;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  color: #ffff;
  font-size: 18px;
  letter-spacing: 0.05em;
  text-transform: capitalize;
`;

const Input = styled.input`
  padding: 10px 55px 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;

  &:focus {
    border: 0;
    outline: none;
  }
`;
