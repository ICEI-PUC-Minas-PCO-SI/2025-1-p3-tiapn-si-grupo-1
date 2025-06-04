import React from 'react';
import { Handle, Position } from 'reactflow';
import { ImageIcon } from 'lucide-react';
import * as S from './style';

const MediaNode = ({ data = {}, selected }) => {
    if (!data) {
        console.warn('🚨 MediaNode recebeu data undefined. Cancelando render.');
        return <div style={{ padding: 8, color: 'red' }}>Erro: dados ausentes</div>;
    }

    const isValidImageUrl =
        typeof data.mediaUrl === 'string' &&
        data.mediaUrl.trim() !== '' &&
        (data.mediaUrl.startsWith('data:image/') || data.mediaUrl.startsWith('http'));

    const handleStyle = {
        width: '12px',
        height: '12px',
        background: '#8B5CF6',
        border: '2px solid #fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        borderRadius: '50%',
    };

    return (
        <S.NodeContainer selected={selected}>
            <Handle type="target" position={Position.Left} id="input" style={handleStyle} />
            <S.Header>
                <S.IconWrapper>
                    <ImageIcon size={12} color="#fff" />
                </S.IconWrapper>
                <S.Label>Imagem</S.Label>
            </S.Header>
            <S.Content>
                <S.Title>{data.title || 'Imagem Sem Título'}</S.Title>
                {isValidImageUrl ? (
                    <S.Image
                        src={data.mediaUrl}
                        alt={data.title || 'Imagem'}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/fallback-image.png';
                        }}
                    />
                ) : (
                    <S.Placeholder>Carregue uma imagem</S.Placeholder>
                )}
            </S.Content>
            <Handle type="source" position={Position.Right} id="output" style={handleStyle} />
        </S.NodeContainer>
    );
};

export default MediaNode;
