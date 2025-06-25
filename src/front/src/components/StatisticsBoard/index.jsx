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
  Header,
  StatisticsIcon,
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
      <Header>
        <StatisticsIcon size={20} />
        <Title>Estatísticas</Title>
      </Header>

      <CardsContainer>
        <StatisticsCard>
          <CardNumbers>
            <FlowsIcon size={18} />
            {loadingStatistics ? "..." : flows}
          </CardNumbers>
          <CardTitle>{"Flows Ativos"}</CardTitle>
        </StatisticsCard>
        <StatisticsCard>
          <CardNumbers>
            <UsersIcon size={18} />
            {loadingStatistics ? "..." : users}
          </CardNumbers>
          <CardTitle>{"Usuários"}</CardTitle>
        </StatisticsCard>
        <StatisticsCard>
          <CardNumbers>
            <CommunityPostsIcon size={18} />
            {loadingStatistics ? "..." : communityPosts}
          </CardNumbers>
          <CardTitle> {"Discussões"}</CardTitle>
        </StatisticsCard>
        <StatisticsCard>
          <CardNumbers>
            <LikesIcon size={18} />
            {loadingStatistics ? "..." : likes}
          </CardNumbers>
          <CardTitle>{"Curtidas"}</CardTitle>
        </StatisticsCard>
      </CardsContainer>
    </StatisticsBoardContainer>
  );
}
