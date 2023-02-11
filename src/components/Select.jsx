import React from "react";
import styled from "styled-components";

const ARROW_SIZE = 8;
const Wrapper = styled.div`
  label {
    margin-bottom: 8px;
    text-align:center;
  }
`

const StyledSelect = styled.div`
  position: relative;
  margin-top: 12px;

  select {
    border: 0;
    padding: 1rem 6rem 1rem 2rem;
    color: white;
    font-size: 1.5rem;
    background: #008fcd;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;

    &:focus,
    :focus-within {
      outline: 1px solid rgba(40, 55, 60, 0.9);
    }
  }

  div {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(40, 55, 60, 0.9);
    width: 35px;
    height: 100%;
    pointer-events: none;

    &::before,
    ::after {
      border-left: ${ARROW_SIZE}px solid transparent;
      border-right: ${ARROW_SIZE}px solid transparent;
      content: "";
      height: 0;
      position: absolute;
      width: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &::before {
      border-bottom: ${ARROW_SIZE}px solid white;
      top: 40%;
    }
    &::after {
      border-top: ${ARROW_SIZE}px solid white;
      top: 60%;
    }
  }
`;

export const Select = ({
  labelKey = "label",
  valueKey = "value",
  label = "Select",
  value,
  onChange,
  options,
}) => {
  return (
    <Wrapper>
      <label>{label}</label>
      <StyledSelect>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select</option>
          {options?.map((props) => (
            <option key={props[valueKey]} value={props[valueKey]}>
              {props[labelKey]}
            </option>
          ))}
        </select>
        <div></div>
      </StyledSelect>
    </Wrapper>
  );
};
