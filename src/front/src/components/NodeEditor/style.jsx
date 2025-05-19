import styled from 'styled-components';

export const EditorContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 300px;
  max-height: 500px;
  padding: 16px;
  overflow-y: auto;
  margin-bottom: 10px;
  
  .ce-block__content {
    max-width: 100%;
  }
  
  .ce-toolbar__content {
    max-width: 100%;
  }
  
  .codex-editor__redactor {
    padding-bottom: 100px !important;
  }
  
  /* Estilo para simular uma folha A4 */
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const EditorToolbar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const ToolbarButton = styled.button`
  padding: 6px 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e9e9e9;
  }
`;

export const CharacterCounter = styled.div`
  font-size: 14px;
  color: ${props => props.isOverLimit ? 'red' : '#666'};
  margin-left: auto;
`;

export const CharacterLimit = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
  padding: 8px;
  background-color: #fff8f8;
  border: 1px solid #ffcccc;
  border-radius: 4px;
`;