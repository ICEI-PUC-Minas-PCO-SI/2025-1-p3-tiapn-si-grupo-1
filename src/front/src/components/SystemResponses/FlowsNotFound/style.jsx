import styled from "styled-components";
import { Ghost } from "lucide-react";

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  height: 100%;
  font-weight: 600;
  color: #666666;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  background-color: #dee2ff;
  padding: 15px;
  border-radius: 50%;
  margin-bottom: 20px;
`;
export const GhostIcon = styled(Ghost)`
  stroke: #233dff;
`;
