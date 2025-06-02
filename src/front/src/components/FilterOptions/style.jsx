import styled from "styled-components";
import { Shapes, Hash, UserPen } from "lucide-react";

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  font-weight: 400;
`;

export const Title = styled.h2`
  color: #565656;
  font-size: 16px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const CategoriesIcon = styled(Shapes)`
  fill: #233dff;
  stroke: #233dff;
  margin-right: 6px;
  width: 20px;
  height: 20px;
`;

export const TagsIcon = styled(Hash)`
  stroke: #233dff;
  margin-right: 6px;
  width: 20px;
  height: 20px;
`;
export const AuthorIcon = styled(UserPen)`
  stroke: #233dff;
  margin-right: 6px;
  width: 20px;
  height: 20px;
`;

export const FilterList = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  gap: 6px;
  padding: 6px 12px;
`;
