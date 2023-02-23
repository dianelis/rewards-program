import styled from "styled-components";

const StyledButton = styled.button`
  padding: 1rem;
  background: #008fcd;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const Button = ({ children, onClick }) => (
  <StyledButton {...{ onClick }}>{children}</StyledButton>
);
