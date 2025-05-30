import styled from "styled-components"

export const HeroContainer = styled.section`
  padding: 5rem 2rem;
  padding-bottom: 0;
  max-width: 100%;
  margin: 0;
`

export const HeroContent = styled.div`
  max-width: 1500px;
`


export const Heading = styled.h1`
  font-size: 4.5rem;
  line-height: 1.2;
  margin-bottom: 2rem;
  font-weight: 490;
  font-family: 'Montserrat', sans-serif;


  strong {
    font-weight: 700;
  }


`

export const SignUpButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background-color: #233DFF;
  color: white;
  border-radius: 20px;
  font-weight: 500;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  margin-bottom: 2rem;

    &:hover {
    transform: scale(1.05); 
  }
`

export const Description = styled.p`
    font-size: 16px;
    
    line-height: 1.6;
    color: #565656;
    font-weight: 500;
    max-width: 1150px ;
    padding-bottom: 50px;
    
`