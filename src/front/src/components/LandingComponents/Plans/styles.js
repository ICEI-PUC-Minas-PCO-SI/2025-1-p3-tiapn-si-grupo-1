import styled from "styled-components"

export const PlansConteiner = styled.section`

`

export const NossosPlanos = styled.h1`
    position: absolute;
    top: 0; 
    left: 50px; 
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    z-index: 2;
    margin-top: 1790px;
    font-weight: 400;
    font-size: 2.3rem;
`

export const ThreeColumnContainerPlan = styled.div`
    justify-content: space-between;
    display: flex;
    position: absolute;
    top: 0; 
    left: 20px; 
    gap: 5rem;;
    padding: 2rem;
    z-index: 2;
    margin-top: 119rem;
    width: 90%;
`

export const CardPlans = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 28rem;
  height: 520px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: left;
  border: 1px solid #eee;
  transition: transform 0.2s ease;
  align-items: flex-start;

  &:hover {
    transform: translateY(-5px);
  }

  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
  }

  h3{
    font-size: 2rem;
    margin: 1rem 0 0.5rem;
    font-weight: 600;
  }

  span{
    font-size: 1rem;
    font-weight: 450;
    margin-left: 5px;
  }

  ul{
    list-style: none;
    padding: 0;
    margin-top: 1.5rem;
  }

  li{
    margin-bottom: 1rem;
    display: flex;
    
  }

  svg{
    position: relative;
    padding-left: 0;
    margin-right: 15px;
    width: 20px;
  }

  .item-text{
    display: inline-block;
    flex: 1;
  }
`

export const CardBlueBox = styled.div`
    background-color: #233DFF;
    border-radius: 12px;
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;

    h2{
        color: #fff;
        font-size: 1.4rem;
        font-weight: 600;
    }
`

export const HorizontalLine3 = styled.div`
  position: absolute;
  top: 2200px;
  right: 20rem;
  height: 4px;
  width: 1250px; /* largura final fixa */
  background-color: blue;
  z-index: 0;
  transform: scaleX(0); /* começa invisível */
  transform-origin: right; /* cresce da direita para a esquerda */
  transition: transform 0.1s ease-out;
`;