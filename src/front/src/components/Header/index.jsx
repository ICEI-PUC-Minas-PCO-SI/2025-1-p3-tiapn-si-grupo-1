import React from "react";
import { HeaderContainer, Username, Title, Button } from "./style";

const Header = ({ title = "Adicionar novo fluxo", user = "Victor Alves", onClick }) => {
    return (
        <HeaderContainer>
            <div>
                <Username>{user}</Username>
                <Title>{title}</Title>
            </div>
            {onClick && (
                <Button onClick={onClick}>
                    Próximo <span>➔</span>
                </Button>
            )}
        </HeaderContainer>
    );
};

export default Header;
