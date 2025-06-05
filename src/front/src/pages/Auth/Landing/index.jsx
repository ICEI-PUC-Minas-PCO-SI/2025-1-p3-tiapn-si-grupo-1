import Header from '../../../components/LandingComponents/Header';
import Hero from '../../../components/LandingComponents/Hero';
import { theme } from "../../../styles/theme"
import ScrollLine from "../../../components/LandingComponents/ScrollLine"
import Footer from '../../../components/LandingComponents/Footer/Footer';
import { LandingContainer } from './style';


import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <LandingContainer>
      <Header />
      <Hero />
      <ScrollLine />
      <Footer/>
    </LandingContainer>
  );
};

export default Landing;
