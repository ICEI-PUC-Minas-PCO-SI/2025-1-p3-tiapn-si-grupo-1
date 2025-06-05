import React from 'react';
import { Handle, Position } from 'reactflow';
import { ImageIcon } from 'lucide-react';
import * as S from './style';

// Componente MediaNode: representa um nó de mídia (imagens, vídeos, etc.)
const MediaNode = ({ data, selected }) => {
    return (
        <S.NodeContainer selected={selected}>
            <Handle
                type="target"
                position={Position.Left}
                className={S.handleStyles}
            />
            <S.Header>
                <S.IconWrapper>
                    <ImageIcon size={12} color="#fff" />
                </S.IconWrapper>
                <S.Label>Mídia</S.Label>
            </S.Header>
            <S.Content>
                {data.title && <S.Title>{data.title}</S.Title>}
                <S.MediaType>{data.type || 'Clique para adicionar mídia'}</S.MediaType>
                <S.FileName>{data.filename || 'Nenhum arquivo selecionado'}</S.FileName>
            </S.Content>
            <Handle
                type="source"
                position={Position.Right}
                className={S.handleStyles}
            />
        </S.NodeContainer>
    );
};

export default MediaNode;