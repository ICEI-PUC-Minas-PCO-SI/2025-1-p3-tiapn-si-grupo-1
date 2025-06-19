import {
  SearchModal,
  CloseButton,
  ModalHeader,
  ModalBody,
  CloseIcon,
  SearchOptionsList,
  SearchOption,
  ModalFlowsContainer,
} from "./style";

//import axios from "axios";
import { useState } from "react";
import ModalSearchBar from "../ModalSearchBar";
import { useUIStore } from "../../store/uiStore";
import { useFlowStore } from "../../store/flowStore";
import { useUserStore } from "../../store/userStore";
import LoadingSpinner from "../LoadingSpinner";                
import ModalFlowCard from "../ModalComponents/ModalFlowCard";
import NoSearchAwnser from "../SystemResponses/NoSearchAwnser";
import { useEffect } from "react";

export default function SearchPage() {
  const [activeOption, setActiveOption] = useState("flows");
  const closeSearchModal = useUIStore((state) => state.closeSearchModal);
  const modalFlows = useFlowStore((state) => state.modalFlows);
  const modalLoading = useFlowStore((state) => state.modalLoading);
  const users = useUserStore((state) => state.users);
  const loadingUsers = useUserStore((state) => state.loadingUsers);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const filteredUsers = useUserStore((state) => state.filteredUsers);
const setModalSearchTerm = useFlowStore((state) => state.setModalSearchTerm);
const resetFilteredUsers = useUserStore((state) => state.resetFilteredUsers);


  useEffect(() => {
    fetchUsers(); // só faz uma vez ao abrir o modal
  }, []);


const handleOptionClick = (option) => {
  setActiveOption(option);

  // Limpa a barra de pesquisa (estado global)
  setModalSearchTerm("");     
  resetFilteredUsers();       // caso o novo seja "usuarios", mostra todos
};

  return (
    <SearchModal>
      <ModalHeader>
        <ModalSearchBar activeOption={activeOption} ></ModalSearchBar>
        <CloseButton onClick={closeSearchModal}>
          <CloseIcon />
        </CloseButton>
      </ModalHeader>
      <ModalBody>
        <SearchOptionsList>
          <SearchOption
            isActive={activeOption === "flows"}
            onClick={() => handleOptionClick("flows")}
          >
            {"Flows ("}
            {modalFlows.length}
            {")"}
          </SearchOption>
          <SearchOption
            isActive={activeOption === "usuarios"}
             onClick={() => handleOptionClick("usuarios")}
          >
             {"Usuários ("}
            {filteredUsers.length}
            {")"}
          </SearchOption>
          <SearchOption
            isActive={activeOption === "tags"}
           onClick={() => handleOptionClick("tags")}
          >
            Tags
          </SearchOption>
        </SearchOptionsList>
        <ModalFlowsContainer>
  {activeOption === "flows" ? (
    modalLoading ? (
      <LoadingSpinner />
    ) : modalFlows.length > 0 ? (
      modalFlows.map((flow) => <ModalFlowCard key={flow.id} flow={flow} />)
    ) : (
      <NoSearchAwnser />
    )
  ) : activeOption === "usuarios" ? (
    loadingUsers ? (
      <LoadingSpinner />
    ) : filteredUsers.length > 0 ? (
      filteredUsers.map((user) => (
        <div key={user.id}>
          <strong>{user.nome}</strong>
          <p>{user.email}</p>
        </div>
      ))
    ) : (
      <NoSearchAwnser />
    )
  ) : (
    <NoSearchAwnser />
  )}
</ModalFlowsContainer>
      </ModalBody>
    </SearchModal>
  );
}
