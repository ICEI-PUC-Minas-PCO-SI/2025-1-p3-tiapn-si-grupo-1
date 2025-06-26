import styled from 'styled-components';
import { Funnel } from "lucide-react";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  justify-content: space-between;
  position: relative;
  gap: 20px;
`;

export const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  transition: margin-left 0.3s ease;
  background-color: #ffffff;
  border-radius: 10px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const CommunityHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffffff;
  padding: 32px;
  border-radius: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #333333;
  

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1rem;
  color: #565656;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ active }) => (active ? '#233dff' : '#e5e5e5')};
  background: ${({ active }) => (active ? 'rgba(35, 61, 255, 0.05)' : '#ffffff')};
  color: ${({ active }) => (active ? '#233dff' : '#666666')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: rgba(35, 61, 255, 0.1);
  }
`;

export const CreatePostButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #233dff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #1e33cc;
  }
`;

export const Badge = styled.span`
  background: #233dff;
  color: #ffffff;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const FilterCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(35, 61, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #333333;
  }
`;

export const ClearFiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #233dff;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 0.875rem;

  &:hover {
    background: rgba(35, 61, 255, 0.05);
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 1rem;
`;

export const FilterLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333333;
  margin-bottom: 0.5rem;
`;

export const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const FilterBadge = styled.span`
  padding: 0.5rem 1rem;
  background: ${({ active }) => (active ? '#233dff' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#ffffff' : '#333333')};
  border: 1px solid ${({ active }) => (active ? '#233dff' : '#e5e5e5')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? '#1e33cc' : 'rgba(35, 61, 255, 0.1)')};
    color: ${({ active }) => (active ? '#ffffff' : '#233dff')};
  }
`;

export const SortSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  background: rgba(35, 61, 255, 0.05);
  padding: 0.25rem;
  border-radius: 4px;
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ active }) => (active ? '#233dff' : 'transparent')};
  color: ${({ active }) => (active ? '#ffffff' : '#333333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: ${({ active }) => (active ? '#1e33cc' : 'rgba(35, 61, 255, 0.1)')};
  }
`;

export const PostCount = styled.div`
  font-size: 0.875rem;
  color: #666666;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

export const EmptyIconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: rgba(35, 61, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #233dff;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.5rem;
`;

export const EmptyText = styled.p`
  font-size: 1rem;
  color: #565656;
  margin-bottom: 1rem;
`;

export const CommunityFilters = styled.aside`
  position: sticky; /* Necessário para posicionar as bolas */
  top: 30px;
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  height: 100%;
  background-color: #233DFF;
  align-self: flex-start;
  overflow: hidden; /* Para não vazar para fora do box */

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    z-index: 0; /* Fica atrás do texto */
  }

  &::before {
    top: -40px;
    left: -40px;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, #3e83fa 0%, #233DFF 60%);
  }

  &::after {
    bottom: -60px;
    right: -60px;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, #5d95f5 0%, #233DFF 60%);
  }

  /* Os filhos ficam acima dos círculos */
  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;


export const FilterHeaderCommunity = styled.header`
  margin-bottom: 20px;
`;

export const FilterIcon = styled(Funnel)`
  fill: #333;
  stroke: #333;
  margin-right: 12px;
  width: 20px;
  height: 20px;
`;

export const FilterTitleCommunity = styled.h2`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
  color: #565656;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ff4d4f;
  font-size: 0.875rem;
  background: #fff1f0;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;