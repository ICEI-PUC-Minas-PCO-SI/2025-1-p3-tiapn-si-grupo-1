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
import ModalUserCard from "../../components/ModalComponents/ModalUserCard";
import { useEffect } from "react";

export default function SearchPage() {
  const [activeOption, setActiveOption] = useState("flows");
  const closeSearchModal = useUIStore((state) => state.closeSearchModal);
  const modalFlows = useFlowStore((state) => state.modalFlows);
  const modalLoading = useFlowStore((state) => state.modalLoading);
  const loadingUsers = useUserStore((state) => state.loadingUsers);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const filteredUsers = useUserStore((state) => state.filteredUsers);
  const setModalSearchTerm = useFlowStore((state) => state.setModalSearchTerm);
  const resetFilteredUsers = useUserStore((state) => state.resetFilteredUsers);
  const modalSearchTerm = useFlowStore((state) => state.modalSearchTerm);
  const filterUsers = useUserStore((state) => state.filterUsers);

  useEffect(() => {
    fetchUsers(); // só faz uma vez ao abrir o modal
  }, []);

  const handleOptionClick = (option) => {
    setActiveOption(option);

    // Usa o termo atual da searchbar
    const termoAtual = modalSearchTerm;

    if (option === "flows") {
      setModalSearchTerm(termoAtual); // dispara busca por flows
    } else if (option === "usuarios") {
      resetFilteredUsers(); // primeiro reseta
      if (termoAtual.trim() !== "") {
        filterUsers(termoAtual); // aplica o filtro
      }
    }
  };

  return (
    <SearchModal>
      <ModalHeader>
        <ModalSearchBar activeOption={activeOption}></ModalSearchBar>
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
              modalFlows.map((flow) => (
                <ModalFlowCard key={flow.id} flow={flow} />
              ))
            ) : (
              <NoSearchAwnser search={activeOption} />
            )
          ) : activeOption === "usuarios" ? (
            loadingUsers ? (
              <LoadingSpinner />
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <ModalUserCard key={user.id} usuario={user} />
              ))
            ) : (
              <NoSearchAwnser search={activeOption} />
            )
          ) : (
            <NoSearchAwnser />
          )}
        </ModalFlowsContainer>
      </ModalBody>
    </SearchModal>
  );
}
