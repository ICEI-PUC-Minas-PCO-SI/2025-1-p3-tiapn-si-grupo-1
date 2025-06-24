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
import { useFiltroStore } from "../../store/filterStore";
import LoadingSpinner from "../LoadingSpinner";
import ModalFlowCard from "../ModalComponents/ModalFlowCard";
import NoSearchAwnser from "../SystemResponses/NoSearchAwnser";
import ModalUserCard from "../../components/ModalComponents/ModalUserCard";
import { useEffect } from "react";
import ModalTagCard from "../ModalComponents/ModalTagCard";

export default function SearchPage() {
  const [activeOption, setActiveOption] = useState("flows");

  // Estado que controla a abertura do modal de busca
  const closeSearchModal = useUIStore((state) => state.closeSearchModal);

  // Estado dos flows dentro do modal
  const modalFlows = useFlowStore((state) => state.modalFlows);
  const modalLoading = useFlowStore((state) => state.modalLoading);

  // Estado dos usuários
  const loadingUsers = useUserStore((state) => state.loadingUsers);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const filteredUsers = useUserStore((state) => state.filteredUsers);

  //Estado das tags
  const filteredTags = useFiltroStore((state) => state.filteredTags);
  const loadingFilter = useFiltroStore((state) => state.loadingFilter);

  useEffect(() => {
    fetchUsers(); // só faz uma vez ao abrir o modal
  }, []);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <SearchModal>
      <ModalHeader>
        <ModalSearchBar></ModalSearchBar>
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
            {`Flows (${modalFlows.length})`}
          </SearchOption>

          <SearchOption
            isActive={activeOption === "usuarios"}
            onClick={() => handleOptionClick("usuarios")}
          >
            {`Usuários (${filteredUsers.length})`}
          </SearchOption>

          <SearchOption
            isActive={activeOption === "tags"}
            onClick={() => handleOptionClick("tags")}
          >
            {`Tags (${filteredTags.length})`}
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
          ) : activeOption === "tags" ? (
            loadingFilter ? (
              <LoadingSpinner />
            ) : filteredTags.length > 0 ? (
              filteredTags.map((tag, index) => (
                <ModalTagCard key={index} tag={tag} />
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
