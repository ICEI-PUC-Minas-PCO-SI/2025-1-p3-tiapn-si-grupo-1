import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  

`;

export const LogoSection = styled.div`
padding-top: 3rem;
    img{
        height: 100px;
        display: block;
        margin: auto;
    }
`

export const Section = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 1rem;
`;

export const IncentiveMessage = styled.p`
  font-size: 0.875rem;
  color: #565656;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const CreateFlowButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #233dff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  width: 100%;
  text-align: center;

  &:hover {
    background: #1e33cc;
  }
`;

export const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  background-color: blue;

  &:hover {
    opacity: 0.8;
  }
`;