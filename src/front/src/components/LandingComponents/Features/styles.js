import styled from "styled-components"
import { Split } from "lucide-react";
import { CirclePlus } from 'lucide-react';
import { Users } from 'lucide-react';

export const RotatedSplit = styled(Split)`
  transform: rotate(90deg);
  color: #233DFF;
  width:32px;
  height: 32px;
  stroke-width: 2.5;
  margin-bottom: 15px;
`

export const Circleplus = styled(CirclePlus)`
  color: #233DFF;
  width:32px;
  height: 32px;
  stroke-width: 2.5;
  margin-bottom: 15px;

`

export const UsersStyle = styled(Users)`
  color: #233DFF;
  width:32px;
  height: 32px;
  stroke-width: 2.5;
  margin-bottom: 15px;
`

export const FeaturesContainer = styled.section`

`

export const Diferencial = styled.h1`
    position: absolute;
    top: 0; /* alinha com o topo da ProgressLine */
    left: 50px; /* dá espaço da linha até o vídeo */
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    z-index: 2;
    margin-top: 1000px;
    font-weight: 400;
    font-size: 2.3rem;
`

//columns

export const ThreeColumnContainer = styled.div`
    justify-content: space-between;
    display: flex;
    position: absolute;
    top: 0; /* alinha com o topo da ProgressLine */
    left: 20px; /* dá espaço da linha até o vídeo */
    gap: 5rem;;
    padding: 2rem;
    z-index: 2;
    margin-top: 72rem;
    width: 90%;
`

export const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 400px;
  height: 370px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: left;
  border: 1px solid #eee;
  transition: transform 0.2s ease;
  align-items: flex-start;
  padding-top: 9rem;

  &:hover {
    transform: translateY(-5px);
  }

  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.5;
  }
`

export const DescriptionF = styled.div`
  position: absolute;
  top: 103rem;
  right: 10rem;
  font-size: 16px;
  font-weight: 500;
  max-width: 450px;
  text-align: center;

`
export const HorizontalLine2 = styled.div`
  position: absolute;
  top: 1375px;
  right: 20rem;
  height: 4px;
  width: 900px; /* largura final fixa */
  background-color: blue;
  z-index: 0;
  transform: scaleX(0); /* começa invisível */
  transform-origin: right; /* cresce da direita para a esquerda */
  transition: transform 0.1s ease-out;
`;