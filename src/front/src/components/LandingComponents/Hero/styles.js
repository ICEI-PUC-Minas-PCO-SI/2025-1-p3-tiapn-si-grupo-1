// styles.js
import styled from "styled-components";

export const HeroContainer = styled.section`
  padding: 5rem 2rem;
  padding-bottom: 0;
  max-width: 100%;
  margin: 0; // Removendo o 'auto' aqui, pois o HeroContent vai controlar o alinhamento
  overflow-x: hidden;
  /* Removendo display: flex e justify-content: center daqui. */
  /* O HeroContent é que vai ter seu próprio alinhamento. */
`;

export const HeroContent = styled.div`
  max-width: 100%; 
  width: 100%; 
  margin-left: 1rem;
  margin-right: 0; 
  text-align: left; 
  box-sizing: border-box; 

  // Se em telas MUITO pequenas o conteúdo precisar centralizar para melhor visualização
  @media (max-width: 576px) {
    padding: 0 1.5rem; // Ajusta o padding para celulares
    text-align: center; // Centraliza o texto apenas em telas muito pequenas, se desejar
  }
`;

export const Heading = styled.h1`
  font-size: 4.5vw;
  line-height: 1.2;
  margin-bottom: 2rem;
  font-weight: 400;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  text-align: left; /* Garante que o título esteja alinhado à esquerda por padrão */

  @media (max-width: 1200px) {
    font-size: 4vw;
  }

  @media (max-width: 992px) {
    font-size: 5vw;
  }

  @media (max-width: 768px) {
    font-size: 6.5vw;
    br {
      display: none;
    }
  }

  @media (max-width: 576px) {
    font-size: 8vw;
    /* Se você decidiu centralizar o HeroContent em telas muito pequenas,
       o heading pode se beneficiar de text-align: center aqui */
    /* text-align: center; */
  }

  strong {
    font-weight: 700;
  }
`;

export const SignUpButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;

  background-color: #233DFF;
  color: white;
  border-radius: 20px;
  font-weight: 500;

  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  margin-bottom: 3rem;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05); 
  }

  /* Media Queries para ajustar o tamanho do botão em telas diferentes */
  @media (min-width: 1200px) {
    /* Para telas muito grandes, aumente um pouco o tamanho da fonte e o padding */
    font-size: 1rem; /* Aumenta um pouco */
  }

  @media (min-width: 1500px) {
    /* Para telas gigantes, pode aumentar mais */
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    /* Para telas de tablet, pode reduzir um pouco ou manter o padrão */
    font-size: 0.95rem;
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
    display: block; 
    width: 100%; 
    max-width: 250px; 
    margin-left: auto; 
    margin-right: auto; 
    text-align: center; 
    box-sizing: border-box; 
  }

`;

export const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #565656;
  font-weight: 500;
  max-width: 80%;
  padding-bottom: 50px;
  margin: 0; /* Removendo margin: 0 auto; aqui. Ele vai herdar o text-align do HeroContent */
  text-align: left; /* Garante que a descrição esteja alinhada à esquerda */

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1.5rem 30px 1.5rem;
    /* Se você decidiu centralizar o HeroContent em telas muito pequenas,
       a descrição pode se beneficiar de text-align: center aqui */
    /* text-align: center; */
  }
`;