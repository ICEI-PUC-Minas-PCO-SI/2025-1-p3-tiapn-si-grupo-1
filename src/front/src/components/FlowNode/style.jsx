import styled from "styled-components";

export const NodeContainer = styled.div`
  width: 200px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-left: 4px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.sm};
  box-shadow: ${props => props.theme.shadows.medium};
`;

export const NodeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

export const NodeIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.backgroundblue};
  padding: ${props => props.theme.spacing.xs};
  border-radius: 5px;
`;

export const NodeLabel = styled.span`
  flex: 1;
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`;

export const NodeActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.colors.textLight};
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.text};
    }
  }
`;

export const HandleStyle = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: props => props.theme.colors.primary,
};