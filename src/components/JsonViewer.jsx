import { JSONTree } from "react-json-tree";
import styled from "styled-components";

const Wrapper = styled.div`
  & > ul:first-of-type {
    text-align: left;
    padding: 1rem !important;
    overflow-y: auto;
    border-radius: 1rem;
    height: 200px;
    margin: 0 !important;
  }
`;

export const JsonViewer = ({ title, data }) => {
  return (
    <Wrapper>
      <h2>{title}</h2>
      <JSONTree {...{ data }} />
    </Wrapper>
  );
};

export default JsonViewer;
