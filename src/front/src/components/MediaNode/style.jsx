import styled from 'styled-components';

export const NodeContainer = styled.div`
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  border: 2px solid ${({ selected }) => (selected ? '#8B5CF6' : '#E2E8F0')};
  min-width: 200px;
  max-width: 240px;
  cursor: pointer;
  transition: all 0.2s ease;
  transform: ${({ selected }) => (selected ? 'scale(1.05)' : 'scale(1)')};
  &:hover {
    border-color: ${({ selected }) => (selected ? '#8B5CF6' : '#CBD5E1')};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  background: #8B5CF6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #4B5563;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-weight: 600;
  color: #1E293B;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: center;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 150px;
  border-radius: 4px;
`;

export const Placeholder = styled.div`
  color: #64748B;
  font-size: 12px;
  text-align: center;
  padding: 16px;
  border: 1px dashed #CBD5E1;
  border-radius: 4px;
`;
