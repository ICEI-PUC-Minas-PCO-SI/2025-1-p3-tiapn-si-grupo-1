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
  UploadArea,
  FileItem,
  ProgressBar,
} from "./style";

import {
  Image as ImageIcon,
  Upload,
  MoreVertical,
  Save,
  X,
  Trash2,
} from "lucide-react";

const MediaModal = ({ node, onClose, onSave }) => {
  const [mediaUrl, setMediaUrl] = useState(node.data.content?.mediaUrl || "");
  const [description, setDescription] = useState(node.data.content?.description || "");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [title, setTitle] = useState(node.data.label || "Nova Multimídia");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => [
        ...prev,
        { name: file.name, size: file.size, progress: 50, status: "uploading" },
      ]);
      setTimeout(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.name === file.name ? { ...f, progress: 100, status: "completed" } : f
          )
        );
        setMediaUrl(URL.createObjectURL(file));
      }, 1500);
    }
  };

  const removeFile = (name) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== name));
    setMediaUrl("");
  };

  const handleSave = () => {
    onSave(node.id, { ...node.data, content: { mediaUrl, description }, label: title });
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalCard>
        <ModalHeader>
          <IconArea>
            <ImageIcon size={20} />
          </IconArea>
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da mídia"
          />
          <Actions>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <MoreVertical size={18} />
            </button>
            {menuOpen && (
              <DropdownMenu>
                <DropdownItem onClick={handleSave}>
                  <Save size={14} /> Salvar
                </DropdownItem>
                <DropdownItem onClick={onClose}>
                  <X size={14} /> Cancelar
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
          <FormGroup>
            <UploadArea>
              <Upload size={24} />
              <span>Escolha um arquivo ou arraste-o aqui.</span>
              <span>JPEG, PNG, MP4 ou PDF — até 50 MB.</span>
              <input
                type="file"
                accept="image/*,video/*,application/pdf"
                onChange={handleFileUpload}
              />
              <button>Escolher Arquivo</button>
            </UploadArea>

            {uploadedFiles.map((file) => (
              <FileItem key={file.name}>
                <span>
                  {file.name} <small>{(file.size / 1024).toFixed(2)} KB</small>
                </span>
                <ProgressBar progress={file.progress} />
                {file.status === "completed" ? (
                  <button onClick={() => removeFile(file.name)}>🗑️</button>
                ) : (
                  <span>{file.status}...</span>
                )}
              </FileItem>
            ))}

            {mediaUrl && (
              <div style={{ marginTop: "12px" }}>
                {mediaUrl.endsWith(".mp4") ? (
                  <video src={mediaUrl} controls style={{ width: "100%" }} />
                ) : (
                  <img src={mediaUrl} alt="Preview" style={{ width: "100%", borderRadius: 8 }} />
                )}
              </div>
            )}
          </FormGroup>

          <FormGroup>
            <Input
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
      </ModalCard>
    </ModalOverlay>
  );
};

export default MediaModal;
