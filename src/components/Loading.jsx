import styled from "styled-components";

export const Loading = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1.2s linear infinite;
  text-align: left;

  &::before,
  ::after {
    content: "";
    position: absolute;
    border-radius: inherit;
  }

  &::before {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(33, 64, 74, 1) 30%,
      rgba(0, 143, 205, 1) 100%
    );
  }

  &::after {
    width: 85%;
    height: 85%;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;