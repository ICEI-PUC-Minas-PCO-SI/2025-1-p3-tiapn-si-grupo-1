import React, { useState } from "react";
import {
  ModalOverlay,
  ModalCard,
  ModalHeader,
  IconArea,
  TitleInput,
  Actions,
  DropdownMenu,
  DropdownItem,
  ModalBody,
  FormGroup,
  Input,
  AddOptionButton,
  OptionList,
} from "./style";

import {
  HelpCircle,
  MoreVertical,
  Trash2,
  Save,
  X,
  Plus,
} from "lucide-react";

const DecisionModal = ({ node, onClose, onSave }) => {
  const [options, setOptions] = useState(
    node.data.content?.options || [
      { id: "yes", label: "Sim" },
      { id: "no", label: "Não" },
    ]
  );
  const [title, setTitle] = useState(node.data.label || "Nova Decisão");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].label = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    const id = `option-${options.length + 1}`;
    setOptions([...options, { id, label: "" }]);
  };

  const handleSave = () => {
    onSave(node.id, { ...node.data, content: { options }, label: title });
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalCard>
        <ModalHeader>
          <IconArea>
            <HelpCircle size={20} />
          </IconArea>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da decisão"
          />
          <Actions>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <MoreVertical size={18} />
            </button>
            {menuOpen && (
              <DropdownMenu>
                <DropdownItem onClick={handleSave}>
                  <Save size={14} />
                  Salvar
                </DropdownItem>
                <DropdownItem onClick={onClose}>
                  <X size={14} />
                  Cancelar
                </DropdownItem>
                <DropdownItem
                  onClick={() => onSave(node.id, null)}
                  style={{ color: "#EF4444" }}
                >
                  <Trash2 size={14} /> Excluir
                </DropdownItem>
              </DropdownMenu>
            )}
          </Actions>
        </ModalHeader>

        <ModalBody>
          <OptionList>
            {options.map((opt, index) => (
              <FormGroup key={opt.id}>
                <Input
                  placeholder={`Opção ${index + 1}`}
                  value={opt.label}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </FormGroup>
            ))}
          </OptionList>

          <AddOptionButton onClick={addOption}>
            <Plus size={14} />
            Adicionar opção
          </AddOptionButton>
        </ModalBody>
      </ModalCard>
    </ModalOverlay>
  );
};

export default DecisionModal;
