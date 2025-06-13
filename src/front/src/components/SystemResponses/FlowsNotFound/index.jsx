import { MessageWrapper, IconWrapper, GhostIcon } from "./style";

export default function FlowsNotFound() {
  return (
    <MessageWrapper>
      <IconWrapper>
        <GhostIcon size={100} />
      </IconWrapper>
      <h3 style={{ color: "#333333" }}>Oops!</h3>
      <p>Nenhum flow por aqui no momento.</p>
    </MessageWrapper>
  );
}
