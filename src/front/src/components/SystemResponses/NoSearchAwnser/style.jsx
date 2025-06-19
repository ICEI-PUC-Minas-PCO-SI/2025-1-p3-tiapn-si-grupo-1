import styled from "styled-components";
import { Search } from "lucide-react";

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;

  justify-content: center;
  height: 100vh;
  font-weight: 400;
  color: #666666;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 75px;
  height: 75px;
  align-items: center;
  justify-content: center;
  background-color: #dee2ff;
  padding: 15px;
  border-radius: 50%;
  margin-bottom: 20px;
`;
export const SearchIcon = styled(Search)`
  stroke: #233dff;
`;
