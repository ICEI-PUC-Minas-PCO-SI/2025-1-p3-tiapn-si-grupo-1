import {
  TrendingBoardContainer,
  Header,
  TrendingIcon,
  Title,
  TrendingList,
  TrendingItem,
  FlowPosition,
  FlowTitle,
  FlowInfo,
  FlowFooter,
  FlowAuthor,
  FlowCategory,
  PlayIconContainer,
  PlayIcon,
} from "./style.jsx";

import { useFlowStore } from "../../store/flowStore.js";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function TrendingBoard() {
  const fetchTrendingFlows = useFlowStore((state) => state.fetchFlows);
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchTrendingFlows();

      response.map((flow) => {
        let points = 0;
        points += flow.stats.likes * 0.5;
        points += flow.stats.comments * 1;
        points += flow.stats.saves * 1.5;
        flow.rankingPoints = points;
        return flow;
      });
      setTrending(response.sort((a, b) => b.rankingPoints - a.rankingPoints));
    };
    fetch();
  }, []);

  const handleClick = (flowID) => {
    navigate(`/flow/${flowID}`);
  };
  return (
    <TrendingBoardContainer>
      <Header>
        <TrendingIcon size={24} />
        <Title>Trending</Title>
      </Header>
      <TrendingList>
        {trending.length > 0
          ? trending.slice(0, 4).map((flow, index) => (
              <TrendingItem key={flow.id} onClick={() => handleClick(flow.id)}>
                <FlowPosition>
                  {index + 1}
                  {"°"}
                </FlowPosition>
                <FlowInfo>
                  <FlowTitle>{flow.titulo}</FlowTitle>
                  <FlowFooter>
                    <FlowAuthor>{flow.usuario.nome}</FlowAuthor>
                    <FlowCategory>{flow.categoria}</FlowCategory>
                  </FlowFooter>
                </FlowInfo>
                <PlayIconContainer>
                  <PlayIcon size={14} />
                </PlayIconContainer>
              </TrendingItem>
            ))
          : ""}
      </TrendingList>
    </TrendingBoardContainer>
  );
}
