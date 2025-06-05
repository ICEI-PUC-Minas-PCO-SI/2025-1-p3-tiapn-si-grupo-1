import styled from "styled-components"

export const FooterContainer = styled.footer`
  top: 210rem ;
  width: 100%;
  color: #ffffff;
  padding: 2rem 0;
  z-index: 0;
  position: absolute;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05);
  background: #ffffff;
  color: #1f2937;
  padding: 4rem 0 0;
  margin-top: auto;
  border-top: 1px solid #e5e7eb;

`

export const FooterContent = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    &:first-child {
      grid-column: 1 / -1;
    }
  }
`

export const FooterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #111827;
`

export const FooterLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  padding: 0.25rem 0;

  &:hover {
    color: #4f46e5;
    transform: translateX(4px);
  }
`

export const Logo = styled.h2`
  display: flex;
  align-items: center;
  
  img {
    height: 55px; 
    width: auto;
    margin-left: 5px
  }

  &:hover {
    transform: scale(1.02); 
  }
`

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

export const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 50%;
  color: #6b7280;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    background: #4f46e5;
    color: #ffffff;
    transform: translateY(-2px);
    border-color: #4f46e5;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

export const NewsletterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
    font-size: 0.9rem;
  }

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
  }
`

export const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

export const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #111827;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`

export const NewsletterButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

export const FooterBottom = styled.div`
  border-top: 1px solid #e5e7eb;
  margin-top: 3rem;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  p {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
  }

  div:last-child {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    div:last-child {
      gap: 1rem;
    }
  }

  @media (max-width: 480px) {
    div:last-child {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
