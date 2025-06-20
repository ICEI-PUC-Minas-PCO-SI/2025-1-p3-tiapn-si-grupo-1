import {
  TagCardWrapper,
  TagInfo,
  TagImage,
  TagIcon,
  TagDetails,
  TagName,
} from "./style";

import { useFlowStore } from "../../../store/flowStore";
import ShowTagFlowsButton from "../ModalTagCard/ShowTagFlowsButton";

export default function ModalTagCard({ tag }) {
  return (
    <TagCardWrapper>
      <TagInfo>
        <TagImage>
          <TagIcon size={20} />
        </TagImage>
        <TagDetails>
          <TagName>#{tag}</TagName>
        </TagDetails>
      </TagInfo>

      <ShowTagFlowsButton tag={tag} />
    </TagCardWrapper>
  );
}
