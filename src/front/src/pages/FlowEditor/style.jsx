import styled from 'styled-components';

// Estilização do contêiner principal
export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #FAFAFA;
`

// Estilização do cabeçalho
export const Header = styled.header`
  background: #fff;
  border-bottom: 1px solid #E2E8F0;
  padding: 12px 16px;
`

// Estilização do conteúdo do cabeçalho
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

// Estilização da seção à esquerda (botão de voltar e título)
export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

// Estilização do botão de voltar
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  font-size: 12px;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: #F8FAFC;
    border-radius: 4px;
  }
`

// Estilização do wrapper do título
export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

// Estilização do título
export const Title = styled.h1`
  font-size: 14px;
  font-weight: 600;
  color: #1E293B;
`

// Estilização do subtítulo
export const Subtitle = styled.p`
  font-size: 12px;
  color: #64748B;
`

// Estilização das ações do cabeçalho
export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

// Estilização do wrapper do progresso
export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

// Estilização da barra de progresso
export const ProgressBar = styled.progress`
  width: 80px;
  height: 8px;
  &::-webkit-progress-bar {
    background: #E2E8F0;
    border-radius: 4px;
  }
  &::-webkit-progress-value {
    background: #233DFF;
    border-radius: 4px;
  }
`

// Estilização do texto de progresso
export const ProgressText = styled.span`
  font-size: 12px;
  color: #64748B;
`

// Estilização do botão de salvar do cabeçalho
export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  font-size: 12px;
  background: #233DFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #1E34CC;
  }
`

// Estilização do wrapper das etapas
export const StepsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex: 1;
`

// Estilização de cada etapa
export const Step = styled.div`
  display: flex;
  align-items: center;
`

// Estilização do ícone da etapa
export const StepIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active }) => ($active ? '#233DFF' : '#F1F5F9')};
  color: ${({ $active }) => ($active ? '#fff' : '#64748B')};
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s;
`

// Estilização do título da etapa
export const StepTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? '#1E293B' : '#64748B')};
  margin-left: 8px;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`

// Estilização do conector entre etapas
export const StepConnector = styled.div`
  width: 48px;
  height: 2px;
  background: ${({ $active }) => ($active ? '#233DFF' : '#E2E8F0')};
  margin: 0 12px;
  border-radius: 9999px;
`

// Estilização do conteúdo principal
export const Content = styled.div`
  flex: 1;
  overflow: hidden;
`

// Estilização da seção de configuração
export const ConfigSection = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

// Estilização do cartão
export const Card = styled.div`
  max-width: 672px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  background: #fff;
`

// Estilização do cabeçalho do cartão
export const CardHeader = styled.div`
  padding: 30px 30px 0px 30px;
`

// Estilização do título do cartão
export const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
`

// Estilização da descrição do cartão
export const CardDescription = styled.p`
  font-size: 14px;
  color: #64748B;
`

// Estilização do conteúdo do cartão
export const CardContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

// Estilização do grupo de formulário
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

// Estilização da linha do formulário
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

// Estilização do rótulo
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
`

// Estilização do input
export const Input = styled.input`
  height: 36px;
  padding: 10px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #233DFF;
  }
`

// Estilização do textarea
export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  resize: none;
  &:focus {
    outline: none;
    border-color: #233DFF;
  }
`

// Estilização do select
export const Select = styled.select`
  height: 40px;
  padding: 10px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #233DFF;
  }
`

// Estilização do wrapper do botão
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
`

// Estilização do botão de próxima etapa
export const NextButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 12px;
  background: #233DFF;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #1E34CC;
  }
`

// Estilização da seção do editor
export const EditorSection = styled.div`
  display: flex;
  height: 100%;
`

// Estilização da sidebar
export const Sidebar = styled.div`
  width: 256px;
  background: #fff;
  border-right: 1px solid #E2E8F0;
  padding: 12px;
  overflow-y: auto;
`

// Estilização da seção dentro da sidebar
export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`

// Estilização do título da sidebar
export const SidebarTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
`

// Estilização do botão de nó
export const NodeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  background: #fff;
  text-align: left;
  cursor: pointer;
  height: 48px;
  &:hover {
    background: #F8FAFC;
    border-color: #233DFF;
  }
`

// Estilização do ícone do nó
export const NodeIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ color }) => color};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Estilização do título do nó
export const NodeTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
`

// Estilização da descrição do nó
export const NodeDescription = styled.div`
  font-size: 12px;
  color: #64748B;
`

// Estilização do cartão de estatísticas
export const StatsCard = styled.div`
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

// Estilização de cada estatística
export const Stat = styled.div`
  text-align: center;
`

// Estilização do valor da estatística
export const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ color }) => color};
`

// Estilização do rótulo da estatística
export const StatLabel = styled.div`
  font-size: 12px;
  color: #64748B;
`

// Estilização do canvas
export const Canvas = styled.div`
  flex: 1;
  height: 100%;
`

// Estilização da seção de publicação
export const PublishSection = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

// Estilização do cartão de resumo
export const SummaryCard = styled.div`
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`

// Estilização do título do resumo
export const SummaryTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 12px;
`

// Estilização da grade do resumo
export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  font-size: 14px;
`

// Estilização do rótulo do resumo
export const SummaryLabel = styled.span`
  font-weight: 500;
  color: #64748B;
`

// Estilização do valor do resumo
export const SummaryValue = styled.p`
  color: #1E293B;
  margin-top: 4px;
`

// Estilização das opções de publicação
export const PublishOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

// Estilização do título de publicação
export const PublishTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
`

// Estilização do rótulo do checkbox
export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #F8FAFC;
  }
  input {
    width: 16px;
    height: 16px;
    color: #233DFF;
    border-radius: 4px;
  }
`

// Estilização do título do checkbox
export const CheckboxTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
`

// Estilização da descrição do checkbox
export const CheckboxDescription = styled.p`
  font-size: 12px;
  color: #64748B;
`

// Estilização do botão de voltar
export const PrevButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #F8FAFC;
  }
`

// Estilização do grupo de botões
export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

// Estilização do botão de rascunho
export const DraftButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #F8FAFC;
  }
`

// Estilização do botão de publicação
export const PublishButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #233DFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #1E34CC;
  }
`

// Estilização do rodapé
export const Footer = styled.div`
  background: #fff;
  border-top: 1px solid #E2E8F0;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
`

// Estilização do modal
export const Modal = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

// Estilização do conteúdo do modal
export const ModalContent = styled.div`
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  margin: 10vh auto;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
`

// Estilização do cabeçalho do modal
export const ModalHeader = styled.div`
  padding-bottom: 16px;
`

// Estilização do título do modal
export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
`

// Estilização da descrição do modal
export const ModalDescription = styled.p`
  font-size: 14px;
  color: #64748B;
`

// Estilização do corpo do modal
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 0;
`

// Estilização da dica do formulário
export const FormHint = styled.p`
  font-size: 12px;
  color: #64748B;
  margin-top: 4px;
`

// Estilização da linha de opção
export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`

// Estilização do número da opção
export const OptionNumber = styled.div`
  width: 24px;
  height: 24px;
  background: #6366F1;
  color: #fff;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`

// Estilização do botão de remover opção
export const RemoveOptionButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #FEF2F2;
    border-color: #FECACA;
  }
`

// Estilização do botão de adicionar opção
export const AddOptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px dashed #E2E8F0;
  border-radius: 4px;
  background: #fff;
  width: 100%;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #F8FAFC;
  }
`

// Estilização da área de upload
export const UploadArea = styled.div`
  border: 2px dashed #E2E8F0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: border-color 0.2s;
  &:hover {
    border-color: #233DFF;
  }
`

// Estilização do conteúdo do upload
export const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

// Estilização do ícone do arquivo
export const FileIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #233DFF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

// Estilização do nome do arquivo
export const FileName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
`

// Estilização do tamanho do arquivo
export const FileSize = styled.p`
  font-size: 12px;
  color: #64748B;
`

// Estilização do ícone de upload
export const UploadIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #F8FAFC;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

// Estilização do texto de upload
export const UploadText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 4px;
`

// Estilização da dica de upload
export const UploadHint = styled.p`
  font-size: 12px;
  color: #64748B;
`

// Estilização dos botões de upload
export const UploadButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`

// Estilização do botão de upload
export const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: #F8FAFC;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

// Estilização do botão de remover arquivo
export const RemoveFileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  background: #fff;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background: #FEF2F2;
    border-color: #FECACA;
  }
`

// Estilização do modal footer
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #E2e8f0;
`

// Estilização do botão de remover
export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #EF4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #DC2626;
  }
`

// Estilização do botão de cancelar
export const CancelButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #F8FAFC;
  }
`

// Estilizar o botão de salvar do modal
export const ModalSaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #233DFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #1E34CC;
  }
`
export const ToastOverride = styled.div`
  .Toastify__toast--success {
    color: #233DFF;
    font-family: 'Inter', sans-serif;
    border-radius: 10px;
  }
`;