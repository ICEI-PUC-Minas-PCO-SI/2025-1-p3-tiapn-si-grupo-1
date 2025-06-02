import styled from "styled-components"

export const VideoContainer = styled.div`
  position: absolute;
  top: 0; /* alinha com o topo da ProgressLine */
  left: 100px; /* dá espaço da linha até o vídeo */
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  width: 960px;
  height: 550px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  z-index: 2;
  margin-left: 200px;
  margin-top: 200px;

    video {
    width: 100%;
    border-radius: 12px;
  }

`

