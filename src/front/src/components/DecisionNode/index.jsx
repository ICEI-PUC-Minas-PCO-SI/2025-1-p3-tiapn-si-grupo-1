import React from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';
import * as S from './style';

// Componente DecisionNode: representa um nó de decisão com opções
const DecisionNode = ({ data, selected }) => {
    const options = data.options && Array.isArray(data.options) ? data.options.slice(0, 3) : ['Opção 1', 'Opção 2'];

    return (
        <S.NodeContainer selected={selected}>
            <Handle
                type="target"
                position={Position.Left}
                id="input"
                className={S.handleStyles}
            />
            <S.Header>
                <S.IconWrapper>
                    <GitBranch size={12} color="#fff" />
                </S.IconWrapper>
                <S.Label>Decisão</S.Label>
            </S.Header>
            <S.Content>
                <S.Question>{data.question || 'Qual é a pergunta?'}</S.Question>
                <S.Options>
                    {options.map((option, index) => (
                        <S.Option key={index}>{option || `Opção ${index + 1}`}</S.Option>
                    ))}
                </S.Options>
            </S.Content>
            {options.map((_, index) => (
                <Handle
                    key={`output-${index}`}
                    type="source"
                    position={Position.Right}
                    id={`output-${index}`}
                    className={S.handleStyles}
                    style={{ top: `${48 + index * 28}px` }} // Alinha com o centro de cada opção
                />
            ))}
        </S.NodeContainer>
    );
};

export default DecisionNode;