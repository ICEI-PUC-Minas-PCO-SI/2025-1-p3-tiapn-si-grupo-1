import { MessageWrapper, IconWrapper, SearchIcon } from "./style";

export default function NoSearchAwnser() {
  return (
    <MessageWrapper>
      <IconWrapper>
        <SearchIcon size={100} />
      </IconWrapper>
      <h3 style={{ color: "#333333" }}>Nenhum flow encontrado</h3>
      <p>Tente usar termos diferentes ou mais específicos</p>
    </MessageWrapper>
  );
}
