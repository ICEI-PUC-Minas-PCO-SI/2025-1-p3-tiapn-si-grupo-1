import styled from 'styled-components';

export const CardLogin = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0,0,0,0.08);
  max-width: 480px;
  height: 560px;
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

export const Subtitle = styled.p`
  font-size: 13px;
  max-width: 250px;
  align-items: center;
  color: #555;
  margin: 30px auto 24px auto; 
`;

export const InputGroup = styled.div`
  margin-top: 60px;
`;


export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 25px;
  border: 1px solid #ccc;
`;

export const HelpText = styled.a`
  font-size: 12px;
  margin-top: 20px;
  color: #000;
  margin-bottom: 16px;
  display: block;
  cursor: pointer;
  text-decoration: underline;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #233DFF;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 8px;
`;

export const Divider = styled.div`
  margin: 24px 0;
  font-size: 12px;
  color: #999;
  position: relative;

  &::before,
  &::after {
    content: '';
    height: 1px;
    background: #ddd;
    position: absolute;
    top: 50%;
    width: 40%;
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
