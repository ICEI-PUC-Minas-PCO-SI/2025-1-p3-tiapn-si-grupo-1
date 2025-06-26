import styled from "styled-components";
import { Tag } from "lucide-react";

export const TagCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #dee2ff;
  padding: 24px;
  gap: 16px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: #f5f6ff;
  }
`;
export const TagInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const TagImage = styled.span`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 10px;
  background-color: #dee2ff;
`;

export const TagIcon = styled(Tag)`
  stroke: #233dff;
`;

export const TagDetails = styled.span`
  display: flex;
  flex-direction: column;
`;

export const TagName = styled.h2`
  font-size: 16px;
  color: #666666;
`;
