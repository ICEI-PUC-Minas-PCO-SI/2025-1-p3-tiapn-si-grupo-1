import styled from 'styled-components';

export const CardContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0,0,0,0.08);
  max-width: 480px;
  height: 550px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-top: 20px;
`;

export const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 8px;
  margin-top: 40px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 550;
`;

export const InputGroup = styled.div`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 25px;
  border: 1px solid #ccc;
`;

export const LinkText = styled.p`
  font-size: 13px;
  color: #000;
  text-align: center;
  margin-bottom: 24px;
  cursor: pointer;
  text-decoration: underline;
`;

export const Button = styled.button`
  width: 100%;
  background: #233DFF;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 24px;
`;

export const Divider = styled.div`
  width: 100%;
  text-align: center;
  color: #aaa;
  font-size: 13px;
  margin: 8px 0 16px;
  position: relative;

  &::before, &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #ddd;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const GoogleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
