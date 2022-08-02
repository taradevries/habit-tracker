import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  font-size: 22px;
  input:checked ~ span:after {
    display: block;
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  align-self: center;
  background: transparent;
  padding: 1rem 1rem;
  margin: 0 1rem;
  transition: all 0.5s ease;
  color: #41403e;
  font-size: 2rem;
  letter-spacing: 1px;
  outline: none;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  /*
    Above is shorthand for:
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius:15px 255px;
  */

  &:after {
    content: "";
    position: absolute;
    display: none;
  }
`;

interface CheckboxProps {
  label: string | ReactNode;
  value?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  value = false,
  onChange,
}) => (
  <Label>
    {label}
    <Input type="checkbox" checked={value} onChange={onChange} />
    <Checkmark />
  </Label>
);
