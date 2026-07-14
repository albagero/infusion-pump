import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import { useSlideNavigation } from './hooks/useSlideNavigation';

import HeroSection from './sections/HeroSection';
import DefinitionSection from './sections/DefinitionSection';
import WhyNeededSection from './sections/WhyNeededSection';
import ComponentsSection from './sections/ComponentsSection';
import WorkingPrincipleSection from './sections/WorkingPrincipleSection';
import FlowMechanismSection from './sections/FlowMechanismSection';
import TypesSection from './sections/TypesSection';
import SafetySection from './sections/SafetySection';
import EngineeringSection from './sections/EngineeringSection';
import ResponsibilitiesSection from './sections/ResponsibilitiesSection';
import SensorsSection from './sections/SensorsSection';
import AdvantagesSection from './sections/AdvantagesSection';
import ApplicationsSection from './sections/ApplicationsSection';
import FutureSection from './sections/FutureSection';
import ThankYouSection from './sections/ThankYouSection';

function App() {
  const TOTAL_SLIDES = 15;
  const { currentSlide, progress, goNext, containerRef } = useSlideNavigation(TOTAL_SLIDES);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Navigation 
        currentSlide={currentSlide} 
        totalSlides={TOTAL_SLIDES} 
        progress={progress} 
        onNext={goNext} 
      />
      
      <div 
        ref={containerRef} 
        className="slide-container"
      >
        <HeroSection />
        <DefinitionSection />
        <WhyNeededSection />
        <ComponentsSection />
        <WorkingPrincipleSection />
        <FlowMechanismSection />
        <TypesSection />
        <SafetySection />
        <EngineeringSection />
        <ResponsibilitiesSection />
        <SensorsSection />
        <AdvantagesSection />
        <ApplicationsSection />
        <FutureSection />
        <ThankYouSection />
      </div>
    </>
  );
}

export default App;
