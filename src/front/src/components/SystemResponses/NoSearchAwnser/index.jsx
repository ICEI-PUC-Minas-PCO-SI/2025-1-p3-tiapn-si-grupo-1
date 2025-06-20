import { MessageWrapper, IconWrapper, SearchIcon } from "./style";

export default function NoSearchAwnser({ search }) {
  console.log(search);
  return (
    <MessageWrapper>
      <IconWrapper>
        <SearchIcon size={100} />
      </IconWrapper>
      <h3 style={{ color: "#333333" }}>
        Nenhum{`${search === "tags" ? "a " : " "}`}
        {`${
          search === "usuarios"
            ? "usuário"
            : search === "flows"
            ? "flow"
            : "tag"
        }`}{" "}
        encontrad{`${search === "tags" ? "a " : "o "}`}
      </h3>
      <p>Tente usar termos diferentes ou mais específicos</p>
    </MessageWrapper>
  );
}
