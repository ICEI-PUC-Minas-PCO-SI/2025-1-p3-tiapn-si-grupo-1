import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.white};
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-left: ${props => props.theme.spacing.md};
`;

export const FlowContainer = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => 
    props.primary 
      ? props.theme.colors.primary 
      : props.theme.colors.white
  };
  color: ${props => 
    props.primary 
      ? props.theme.colors.white 
      : props.theme.colors.text
  };
  border: 1px solid ${props => 
    props.primary 
      ? props.theme.colors.primary 
      : props.theme.colors.border
  };
  border-radius: ${props => props.theme.borderRadius.medium};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  transition: all 0.2s ease;
  
  &:hover {
    opacity: ${props => props.disabled ? 0.7 : 0.9};
  }
  
  &.danger-button {
    background-color: ${props => props.theme.colors.error};
    color: white;
    border-color: ${props => props.theme.colors.error};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

export const NodeContainer = styled.div`
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: white;
  border: 1px solid #ddd;
  width: 300px;
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  
  ${props => {
    switch(props.type) {
      case 'decision':
        return `
          border-color: #f0ad4e;
          border-width: 2px;
          border-radius: 50%;
        `;
      case 'process':
        return `
          border-color: #5bc0de;
          border-width: 2px;
          border-radius: 0;
        `;
      case 'document':
        return `
          border-color: #5cb85c;
          border-width: 2px;
          border-radius: 8px 8px 0 8px;
        `;
      default:
        return '';
    }
  }}
`;

export const NodeHeader = styled.div`
  font-weight: bold;
  padding: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
  }
`;

export const NodeContent = styled.div`
  padding: ${props => props.theme.spacing.sm};
  font-size: 14px;
  max-height: 320px;
  overflow-y: auto;
  
  p {
    margin-bottom: 8px;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 8px;
    
    th, td {
      border: 1px solid #ddd;
      padding: 4px;
    }
    
    th {
      background-color: #f5f5f5;
    }
  }
`;

export const EditorModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const EditorContainer = styled.div`
  background-color: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.large};
`;

export const EditorHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EditorTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

export const EditorContent = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

export const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  background-color: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

export const ToolbarButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const NodeTypeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: ${props => props.theme.spacing.sm};
`;

export const NodeTypeOption = styled.div`
  padding: 8px;
  background-color: ${props => props.theme.colors.background};
  border: 1px dashed ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 14px;
  cursor: grab;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.theme.colors.border};
  }
`;

export const NodeFormField = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const NodeFormLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
`;

export const NodeFormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
`;

export const SaveIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${props => props.theme.colors.success};
  color: white;
  padding: 10px 20px;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
  z-index: 1000;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(20px); }
  }
`;

export const InfoPanelBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  max-height: ${props => props.isOpen ? '50vh' : '40px'};
  transition: max-height 0.3s ease;
  overflow: hidden;
  z-index: 50;
`;

export const InfoPanelBottomHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const InfoContent = styled.div`
  padding: ${props => props.theme.spacing.md};
  overflow-y: auto;
  max-height: calc(50vh - 50px);
`;

export const InfoSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

export const InfoSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

export const Tag = styled.div`
  padding: 4px 10px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 16px;
  font-size: 12px;
`;

export const PublishButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.lg};
  
  &:hover {
    opacity: 0.9;
  }
`;