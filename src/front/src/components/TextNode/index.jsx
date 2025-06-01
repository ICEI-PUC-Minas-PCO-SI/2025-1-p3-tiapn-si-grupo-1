import React from 'react';
import { Handle, Position } from 'reactflow';
import { Type } from 'lucide-react';
import * as S from './style';

// Componente TextNode: representa um nó de conteúdo textual
const TextNode = ({ data, selected }) => {
    return (
        <S.NodeContainer selected={selected}>
            <Handle
                type="target"
                position={Position.Left}
                className={S.handleStyles}
            />
            <S.Header>
                <S.IconWrapper>
                    <Type size={12} color="#fff" />
                </S.IconWrapper>
                <S.Label>Conteúdo</S.Label>
            </S.Header>
            <S.Content>
                {data.title && <S.Title>{data.title}</S.Title>}
                <S.Text>{data.content || 'Clique para adicionar conteúdo...'}</S.Text>
            </S.Content>
            <Handle
                type="source"
                position={Position.Right}
                className={S.handleStyles}
            />
        </S.NodeContainer>
    );
};

export default TextNode;