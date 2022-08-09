import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  font-size: 22px;
  cursor: pointer;
  & > span:after {
    content: "";
    position: absolute;
    display: none;
  }
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
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  background: transparent;
  transition: all 0.5s ease;
  color: #41403e;
  font-size: 2rem;
  letter-spacing: 1px;
  outline: none;
  border: solid 2px #41403e;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  /*
    Above is shorthand for:
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    border-bottom-right-radius: 225px 15px;
    border-bottom-left-radius:15px 255px;
  */

  &:after {
    left: 8px;
    top: -6px;
    width: 8px;
    height: 20px;
    border: solid #d63a4f;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
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
