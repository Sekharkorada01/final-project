import React, { useState } from 'react';
import Featured from '../components/HomePageComp/Featured';
import TrustedBy from '../components/HomePageComp/TrustedBy';
// import Slider from '../components/HomePageComp/ServicesSlider';
import BestPart from '../components/HomePageComp/BestPart';
import Career from '../components/HomePageComp/Career';
import FiverrBusiness from '../components/HomePageComp/FiverrBusiness';
import ProjectsSlider from '../components/HomePageComp/ProjectsSlider';
import ServicesSlider from '../components/HomePageComp/ServicesSlider';
import JoinFiver from '../components/HomePageComp/JoinFiver';

const Index = () => {
  return (
  <div className='Home'>
  <Featured/>
  <TrustedBy/>
  <ServicesSlider/>
  <BestPart/>
  <Career/>
  <FiverrBusiness/>
  <ProjectsSlider/>
  <JoinFiver/>


  </div>
  
  );
}

export default Index;
