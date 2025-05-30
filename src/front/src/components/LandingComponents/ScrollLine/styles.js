import styled from "styled-components"

export const ProgressLine = styled.div`
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background-color: blue;
  transition: height 0.1s linear;
  margin-left: 100px;
  z-index: 1000;
`
export const ProgressContainer = styled.section`
  position: relative;
`

export const ProgressCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: blue;
  border-radius: 50%;
  position: absolute;
  left: 92px;
`