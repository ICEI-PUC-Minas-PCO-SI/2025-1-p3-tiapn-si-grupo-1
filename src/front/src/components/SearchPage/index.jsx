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
import LoadingSpinner from "../LoadingSpinner";
import ModalFlowCard from "../ModalComponents/ModalFlowCard";
import NoSearchAwnser from "../SystemResponses/NoSearchAwnser";

export default function SearchPage() {
  const [activeOption, setActiveOption] = useState("flows");
  const closeSearchModal = useUIStore((state) => state.closeSearchModal);
  const modalFlows = useFlowStore((state) => state.modalFlows);
  const modalLoading = useFlowStore((state) => state.modalLoading);

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
            onClick={() => setActiveOption("flows")}
          >
            {"Flows ("}
            {modalFlows.length}
            {")"}
          </SearchOption>
          <SearchOption
            isActive={activeOption === "usuarios"}
            onClick={() => setActiveOption("usuarios")}
          >
            Usuários
          </SearchOption>
          <SearchOption
            isActive={activeOption === "tags"}
            onClick={() => setActiveOption("tags")}
          >
            Tags
          </SearchOption>
        </SearchOptionsList>
        <ModalFlowsContainer>
          {modalLoading ? (
            <LoadingSpinner />
          ) : modalFlows.length > 0 ? (
            modalFlows.map((flow) => (
              <ModalFlowCard flow={flow} key={flow.id} />
            ))
          ) : !modalLoading && modalFlows.length === 0 ? (
            <NoSearchAwnser />
          ) : null}
        </ModalFlowsContainer>
      </ModalBody>
    </SearchModal>
  );
}
