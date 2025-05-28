import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 300px;
  background: ${props => props.theme.colors.white};
  border-left: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.lg};
  height: calc(100vh - 80px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  right: 0;
  top: 80px;
  z-index: 101;
  overflow-y: auto;
  border-radius: ${props => props.theme.borderRadius.large} 0 0 ${props => props.theme.borderRadius.large};
  transition: transform 0.3s ease;
`;

export const DetailsHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

export const Label = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.textLight};
  text-transform: uppercase;
`;

export const Value = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`;

export const TagList = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

export const TagItem = styled.span`
  background: ${props => props.theme.colors.backgroundblue};
  color: ${props => props.theme.colors.primary};
  padding: 4px 8px;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 12px;
  transition: background 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;