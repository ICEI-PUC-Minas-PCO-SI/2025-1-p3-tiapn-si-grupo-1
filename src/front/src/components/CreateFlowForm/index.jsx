// src/components/CreateFlowForm/index.jsx
import React, { useState } from 'react';
import {
    FormContainer,
    FormGroup,
    Label,
    Input,
    Textarea,
    TagInputContainer,
    Tag,
    AddTagButton,
    ButtonGroup,
    PrimaryButton
} from './style';

const CreateFlowForm = ({ onSubmit }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tags, setTags] = useState([]);
    const [novaTag, setNovaTag] = useState('');

    const adicionarTag = () => {
        if (novaTag && !tags.includes(novaTag)) {
            setTags([...tags, novaTag]);
            setNovaTag('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ titulo, descricao, categoria, tags });
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Título</Label>
                <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </FormGroup>

            <FormGroup>
                <Label>Descrição</Label>
                <Textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
            </FormGroup>

            <FormGroup>
                <Label>Categoria</Label>
                <Input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            </FormGroup>

            <FormGroup>
                <Label>Tags</Label>
                <TagInputContainer>
                    <Input
                        value={novaTag}
                        onChange={(e) => setNovaTag(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && adicionarTag()}
                        placeholder="Digite e pressione Enter"
                    />
                    <AddTagButton type="button" onClick={adicionarTag}>+</AddTagButton>
                </TagInputContainer>
                <div>
                    {tags.map((tag, idx) => (
                        <Tag key={idx}>{tag}</Tag>
                    ))}
                </div>
            </FormGroup>
        </FormContainer>
    );
};

export default CreateFlowForm;
