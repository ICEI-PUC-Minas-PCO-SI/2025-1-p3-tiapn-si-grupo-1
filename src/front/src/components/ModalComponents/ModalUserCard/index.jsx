import {
  UserCardWrapper,
  AuthorInfo,
  Avatar,
  UserName,
  UserData,
  UserEmail,
  MailIcon,
} from "./style";

import { getIniciais } from "../../../services/avatarService";
import OpenUserProfileButton from "./OpenUserProfileButton/index";

export default function ModalUserCard({ usuario }) {
  return (
    <UserCardWrapper>
      <AuthorInfo>
        <Avatar>{getIniciais(usuario.nome)}</Avatar>
        <UserData>
          <UserName>{usuario.nome}</UserName>
          <UserEmail>
            <MailIcon size={14} />
            {usuario.email}
          </UserEmail>
        </UserData>
      </AuthorInfo>
      <OpenUserProfileButton />
    </UserCardWrapper>
  );
}
