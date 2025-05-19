import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Table from '@editorjs/table';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import Embed from '@editorjs/embed';
import { EditorContainer, EditorToolbar, ToolbarButton, CharacterCounter, CharacterLimit } from './style';

const MAX_CHARACTERS = 1000; // Limite de caracteres por nó

const NodeEditor = ({ initialContent, onSave }) => {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [isOverLimit, setIsOverLimit] = useState(false);
  
  useEffect(() => {
    // Inicializar o Editor.js
    if (!instanceRef.current && editorRef.current) {
      try {
        instanceRef.current = new EditorJS({
          holder: editorRef.current,
          tools: {
            header: {
              class: Header,
              inlineToolbar: true,
              config: {
                levels: [1, 2, 3, 4],
                defaultLevel: 2
              }
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: 'unordered'
              }
            },
            image: {
              class: Image,
              config: {
                uploader: {
                  uploadByFile(file) {
                    // Aqui você implementaria o upload real
                    // Por enquanto, vamos simular com uma URL local
                    return new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.onload = function(e) {
                        resolve({
                          success: 1,
                          file: {
                            url: e.target.result
                          }
                        });
                      };
                      reader.readAsDataURL(file);
                    });
                  }
                }
              }
            },
            table: {
              class: Table,
              inlineToolbar: true,
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
              config: {
                quotePlaceholder: 'Digite uma citação',
                captionPlaceholder: 'Autor da citação',
              },
            },
            marker: {
              class: Marker,
              shortcut: 'CMD+SHIFT+M',
            },
            code: {
              class: CodeTool,
              shortcut: 'CMD+SHIFT+C',
            },
            embed: {
              class: Embed,
              config: {
                services: {
                  youtube: true,
                  vimeo: true,
                }
              }
            }
          },
          data: parseInitialContent(initialContent),
          placeholder: 'Clique para começar a editar...',
          onChange: () => {
            // Verificar o número de caracteres
            checkCharacterCount();
          }
        });
        
        // Verificar o número de caracteres inicial
        setTimeout(checkCharacterCount, 500);
      } catch (error) {
        console.error("Erro ao inicializar o Editor.js:", error);
      }
    }
    
    return () => {
      if (instanceRef.current && typeof instanceRef.current.destroy === 'function') {
        try {
          instanceRef.current.destroy();
        } catch (error) {
          console.error("Erro ao destruir o Editor.js:", error);
        }
        instanceRef.current = null;
      }
    };
  }, [initialContent]);
  
  // Função para verificar o número de caracteres
  const checkCharacterCount = async () => {
    if (instanceRef.current) {
      try {
        const data = await instanceRef.current.save();
        let count = 0;
        
        // Contar caracteres em todos os blocos
        data.blocks.forEach(block => {
          if (block.type === 'paragraph' || block.type === 'header') {
            count += block.data.text.replace(/<[^>]*>/g, '').length;
          } else if (block.type === 'list') {
            block.data.items.forEach(item => {
              count += item.replace(/<[^>]*>/g, '').length;
            });
          } else if (block.type === 'quote') {
            count += block.data.text.replace(/<[^>]*>/g, '').length;
            if (block.data.caption) {
              count += block.data.caption.length;
            }
          } else if (block.type === 'code') {
            count += block.data.code.length;
          }
        });
        
        setCharacterCount(count);
        setIsOverLimit(count > MAX_CHARACTERS);
      } catch (error) {
        console.error("Erro ao verificar o número de caracteres:", error);
      }
    }
  };
  
  // Função para converter o HTML inicial em um formato que o Editor.js possa entender
  const parseInitialContent = (htmlContent) => {
    // Se o conteúdo for HTML simples, convertemos para um bloco de parágrafo
    if (htmlContent && typeof htmlContent === 'string' && htmlContent.startsWith('<p>')) {
      return {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: htmlContent
            }
          }
        ]
      };
    }
    
    // Se já for um objeto JSON do Editor.js, retornamos como está
    try {
      if (typeof htmlContent === 'string') {
        const parsed = JSON.parse(htmlContent);
        if (parsed && parsed.blocks) {
          return parsed;
        }
      } else if (htmlContent && htmlContent.blocks) {
        return htmlContent;
      }
    } catch (e) {
      // Se não for JSON válido, continuamos com o tratamento padrão
    }
    
    // Caso contrário, criamos um bloco de parágrafo vazio
    return {
      blocks: [
        {
          type: "paragraph",
          data: {
            text: typeof htmlContent === 'string' ? htmlContent : "Comece a editar aqui..."
          }
        }
      ]
    };
  };
  
  // Funções para inserir elementos específicos
  const insertHeader = () => {
    if (instanceRef.current) {
      instanceRef.current.blocks.insert('header', {
        text: 'Novo título',
        level: 2
      });
    }
  };
  
  const insertList = () => {
    if (instanceRef.current) {
      instanceRef.current.blocks.insert('list', {
        style: 'unordered',
        items: ['Item 1', 'Item 2', 'Item 3']
      });
    }
  };
  
  const insertImage = () => {
    // Simular clique no botão de upload de imagem
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file && instanceRef.current) {
        instanceRef.current.blocks.insert('image', {
          file,
          caption: 'Imagem inserida'
        });
      }
    };
    fileInput.click();
  };
  
  const insertTable = () => {
    if (instanceRef.current) {
      instanceRef.current.blocks.insert('table', {
        withHeadings: true,
        data: {
          content: [
            ['Cabeçalho 1', 'Cabeçalho 2', 'Cabeçalho 3'],
            ['Célula 1', 'Célula 2', 'Célula 3'],
            ['Célula 4', 'Célula 5', 'Célula 6']
          ]
        }
      });
    }
  };
  
  const insertQuote = () => {
    if (instanceRef.current) {
      instanceRef.current.blocks.insert('quote', {
        text: 'Digite sua citação aqui',
        caption: 'Autor da citação',
        alignment: 'left'
      });
    }
  };
  
  const insertEmbed = () => {
    if (instanceRef.current) {
      const url = prompt('Digite a URL do vídeo (YouTube ou Vimeo):');
      if (url) {
        instanceRef.current.blocks.insert('embed', {
          service: 'youtube',
          source: url,
          embed: url,
          width: 580,
          height: 320
        });
      }
    }
  };
  
  return (
    <div>
      <EditorToolbar>
        <ToolbarButton onClick={insertHeader}>Título</ToolbarButton>
        <ToolbarButton onClick={insertList}>Lista</ToolbarButton>
        <ToolbarButton onClick={insertImage}>Imagem</ToolbarButton>
        <ToolbarButton onClick={insertTable}>Tabela</ToolbarButton>
        <ToolbarButton onClick={insertQuote}>Citação</ToolbarButton>
        <ToolbarButton onClick={insertEmbed}>Vídeo</ToolbarButton>
        <CharacterCounter isOverLimit={isOverLimit}>
          {characterCount}/{MAX_CHARACTERS} caracteres
        </CharacterCounter>
      </EditorToolbar>
      <EditorContainer ref={editorRef} id="editor" />
      {isOverLimit && (
        <CharacterLimit>
          Limite de caracteres excedido! Considere criar um novo nó para continuar.
        </CharacterLimit>
      )}
    </div>
  );
};

export default NodeEditor;