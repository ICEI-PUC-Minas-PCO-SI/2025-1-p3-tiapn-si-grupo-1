import { User } from "lucide-react";
import { useEffect } from "react";
import { useStatisticsStore } from "../../store/statisticsStore";

import {
  StatisticsBoardContainer,
  Title,
  CardsContainer,
  StatisticsCard,
  CardTitle,
  CardNumbers,
  UsersIcon,
  CommunityPostsIcon,
  LikesIcon,
  FlowsIcon,
} from "./style";

export default function StatisticsBoard() {
  const {
    flows,
    users,
    communityPosts,
    likes,
    loadingStatistics,
    fetchAllStatistics,
  } = useStatisticsStore();

  useEffect(() => {
    fetchAllStatistics();
  }, [fetchAllStatistics]);

  return (
    <StatisticsBoardContainer>
      <Title>Estatísticas</Title>
      <CardsContainer>
        <StatisticsCard>
          <CardNumbers>
            <FlowsIcon />
            {loadingStatistics ? "..." : flows}
          </CardNumbers>
          <CardTitle>{"Flows Ativos"}</CardTitle>
        </StatisticsCard>
        <StatisticsCard>
          <CardNumbers>
            <UsersIcon />
            {loadingStatistics ? "..." : users}
          </CardNumbers>
          <CardTitle>{"Usuários Cadastrados"}</CardTitle>
        </StatisticsCard>
        <StatisticsCard>
          <CardNumbers>
            <CommunityPostsIcon />
            {loadingStatistics ? "..." : communityPosts}
          </CardNumbers>
          <CardTitle> {"Discussões"}</CardTitle>
        </StatisticsCard>
        <StatisticsCard>
          <CardNumbers>
            <LikesIcon />
            {loadingStatistics ? "..." : likes}
          </CardNumbers>
          <CardTitle>{"Curtidas"}</CardTitle>
        </StatisticsCard>
      </CardsContainer>
    </StatisticsBoardContainer>
  );
}
