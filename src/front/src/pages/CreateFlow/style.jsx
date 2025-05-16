import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const FormWrapper = styled.div`
  flex: 1;
  padding: 2rem 4rem;
  background-color: #f9f9f9;
  overflow-y: auto;
`;

export const StageTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #233dff;
`;
