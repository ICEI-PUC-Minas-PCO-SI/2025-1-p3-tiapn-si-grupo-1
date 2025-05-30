import Header from '../../../components/LandingComponents/Header';
import Hero from '../../../components/LandingComponents/Hero';
import { theme } from "../../../styles/theme"
import ScrollLine from "../../../components/LandingComponents/ScrollLine"


import { Link } from 'react-router-dom';

const Landing = () => {
  return (
      <>
      <Header />
      <Hero />
      <ScrollLine />
    </>
  );
};

export default Landing;
