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
import EnvironmentalFactorsSection from './sections/EnvironmentalFactorsSection';
import FluidColorSection from './sections/FluidColorSection';
import PumpHeightSection from './sections/PumpHeightSection';
import AltitudeSection from './sections/AltitudeSection';
import MaintenanceChecklistSection from './sections/MaintenanceChecklistSection';
import SimulatorSection from './sections/SimulatorSection';
import AdvantagesSection from './sections/AdvantagesSection';
import ApplicationsSection from './sections/ApplicationsSection';
import FutureSection from './sections/FutureSection';
import ThankYouSection from './sections/ThankYouSection';

function App() {
  const TOTAL_SLIDES = 21;
  const { 
    currentSlide, 
    totalSlides, 
    progress, 
    goNext, 
    goPrev, 
    containerRef
  } = useSlideNavigation(TOTAL_SLIDES);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {mounted && (
        <Navigation 
          currentSlide={currentSlide} 
          totalSlides={TOTAL_SLIDES} 
          progress={progress} 
          onNext={goNext} 
        />
      )}
      
      <div 
        ref={containerRef} 
        className="slide-container"
      >
        <HeroSection />
        <DefinitionSection />
        <WhyNeededSection />
        <TypesSection />
        <ComponentsSection />
        <WorkingPrincipleSection />
        <SensorsSection />
        <FlowMechanismSection />
        <EngineeringSection />
        <SafetySection />
        <ResponsibilitiesSection />
        <EnvironmentalFactorsSection />
        <FluidColorSection />
        <PumpHeightSection />
        <AltitudeSection />
        <MaintenanceChecklistSection />
        <SimulatorSection />
        <AdvantagesSection />
        <ApplicationsSection />
        <FutureSection />
        <ThankYouSection />
      </div>
    </>
  );
}

export default App;
