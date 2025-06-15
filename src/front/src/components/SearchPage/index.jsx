import {
  SearchModal,
  CloseButton,
  ModalHeader,
  ModalBody,
  CloseIcon,
} from "./style";

import ModalSearchBar from "../ModalSearchBar";

import { useUIStore } from "../../store/uiStore";

export default function SearchPage() {
  const closeSearchModal = useUIStore((state) => state.closeSearchModal);

  return (
    <SearchModal>
      <ModalHeader>
        <ModalSearchBar></ModalSearchBar>
        <CloseButton onClick={closeSearchModal}>
          <CloseIcon />
        </CloseButton>
      </ModalHeader>
      <ModalBody></ModalBody>
    </SearchModal>
  );
}
