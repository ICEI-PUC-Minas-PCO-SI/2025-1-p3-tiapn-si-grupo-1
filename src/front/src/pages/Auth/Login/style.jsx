import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background || '#f8fafc'};
`;

export const ToastOverride = styled.div`
  position: fixed;
  z-index: 9999;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 80px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 50px;
    width: auto;
    transition: transform 0.2s;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SignUpButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #233dff;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  text-decoration: none;

  &:hover {
    background-color: #1e33cc;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(35, 61, 255, 0.3);
  }
`;

export const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Card = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 28px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: #6b7280;
  margin: 0 auto 2rem;
  max-width: 300px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 25px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #1f2937;
  background-color: #f9fafb;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #233dff;
    box-shadow: 0 0 0 3px rgba(35, 61, 255, 0.1);
  }
`;

export const HelpText = styled.a`
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  color: #233dff;
  text-decoration: underline;
  cursor: pointer;
  margin: 0.5rem 0;

  &:hover {
    color: #1e33cc;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #233dff;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: #1e33cc;
    transform: scale(1.02);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(35, 61, 255, 0.3);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  margin: 1.5rem 0;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  color: #9ca3af;
  position: relative;
  text-align: center;

  &::before,
  &::after {
    content: '';
    height: 1px;
    background: #e5e7eb;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    border-color: #233dff;
    box-shadow: 0 0 0 3px rgba(35, 61, 255, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(35, 61, 255, 0.3);
  }
`;