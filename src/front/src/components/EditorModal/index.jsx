import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import HeaderTool from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";

import {
  ModalOverlay,
  ModalCard,
  ModalHeader,
  IconArea,
  TitleInput,
  Actions,
  EditorWrapper,
  DropdownMenu,
  DropdownItem,
} from "./style";

import { FileText, MoreVertical, Trash2, Save, X } from "lucide-react";

const EditorModal = ({ node, onClose, onSave, showSidebar }) => {
  const editorRef = useRef(null);
  const holderRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [title, setTitle] = useState(node.data.label || "Novo título");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!node || !holderRef.current || editorRef.current) return;

    const initialBlocks =
      node.data.content?.blocks?.length > 0
        ? node.data.content
        : {
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "Novo texto...",
                },
              },
            ],
          };

    editorRef.current = new EditorJS({
      holder: holderRef.current,
      autofocus: true,
      data: initialBlocks,
      tools: {
        header: HeaderTool,
        list: List,
        table: Table,
        image: ImageTool,
      },
      placeholder: "Novo texto...",
      onReady: () => setIsReady(true),
    });

    return () => {
      editorRef.current?.destroy?.();
      editorRef.current = null;
      setIsReady(false);
    };
  }, [node]);

  const handleSave = async () => {
    if (!editorRef.current) return onClose();

    try {
      const content = await editorRef.current.save();
      onSave(node.id, { ...content, label: title });
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
    } finally {
      onClose();
    }
  };

  return (
    <ModalOverlay $sidebarOpen={showSidebar}>
      <ModalCard>
        <ModalHeader>
          <IconArea>
            <FileText size={20} />
          </IconArea>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do nó"
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

        <EditorWrapper>
          <div ref={holderRef} key={`editor-${node.id}`} />
          {!isReady && <p>Carregando editor...</p>}
        </EditorWrapper>
      </ModalCard>
    </ModalOverlay>
  );
};

export default EditorModal;
