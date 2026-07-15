import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import SlideWrapper from '../components/SlideWrapper';

const EngineeringSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120 } }
  };

  const Block = ({
    title,
    subtitle,
    color = "bg-white text-navy-800 border border-blue-100",
  }: {
    title: string;
    subtitle?: string;
    color?: string;
  }) => (
    <motion.div
      variants={itemVariants}
      className={`${color} text-xs lg:text-sm font-semibold px-3 py-2 lg:px-5 lg:py-3 min-w-[80px] lg:min-w-[120px] shadow-md rounded-xl text-center flex-shrink-0 hover:scale-105 transition-transform duration-200 cursor-default`}
    >
      <div>{title}</div>
      {subtitle && <div className="text-[10px] lg:text-xs font-normal opacity-70 mt-0.5">{subtitle}</div>}
    </motion.div>
  );

  const HArrow = () => (
    <motion.div variants={itemVariants} className="flex items-center justify-center px-0.5 lg:px-2">
      <ArrowRight className="text-blue-300 w-4 h-4 lg:w-6 lg:h-6" strokeWidth={2} />
    </motion.div>
  );

  const VArrow = () => (
    <motion.div variants={itemVariants} className="flex justify-center my-1 lg:my-2">
      <ArrowDown className="text-blue-300 w-4 h-4 lg:w-6 lg:h-6" strokeWidth={2} />
    </motion.div>
  );

  const VLine = () => (
    <motion.div variants={itemVariants} className="flex justify-center h-6 lg:h-10">
      <div className="w-0.5 bg-blue-200 h-full rounded-full" />
    </motion.div>
  );

  return (
    <SlideWrapper className="bg-section-gradient" id="engineering">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 py-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6 w-full">
          <span className="text-medical-blue/40 text-sm font-bold tracking-widest uppercase mb-1 sm:mb-2 block">09</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-navy-900">System Architecture</h2>
        </div>

        {/* MOBILE VIEW (Vertical List) */}
        <div className="sm:hidden w-full overflow-y-auto pb-4">
          <motion.div
            className="flex flex-col items-center justify-center w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Block title="Power Supply" subtitle="12V DC" />
            <VArrow />
            <Block title="PCB" subtitle="Circuit Board" />
            <VArrow />
            <Block
              title="Microcontroller"
              subtitle="ATmega / ARM"
              color="bg-medical-blue text-white border-none shadow-xl shadow-medical-blue/40 font-extrabold"
            />
            <VArrow />
            <div className="flex gap-2 justify-center w-full my-2">
              <Block title="Display" subtitle="LCD / OLED" color="bg-blue-50 text-blue-800 border border-blue-200" />
              <Block title="Sensors" subtitle="Pressure, Flow" color="bg-blue-50 text-blue-800 border border-blue-200" />
              <Block title="Alarm" subtitle="Buzzer + LED" color="bg-red-50 text-red-700 border border-red-200" />
            </div>
            <VArrow />
            <Block title="Motor Driver" subtitle="H-Bridge" />
            <VArrow />
            <Block title="Stepper Motor" subtitle="NEMA 17" />
            <VArrow />
            <Block title="Rollers" subtitle="Peristaltic" />
            <VArrow />
            <Block title="IV Tube" subtitle="Silicone" />
            <VArrow />
            <Block
              title="Patient"
              subtitle="Drug Delivery"
              color="bg-emerald-500 text-white border-none shadow-lg shadow-emerald-400/40"
            />
          </motion.div>
        </div>

        {/* DESKTOP VIEW (Diagram Card) */}
        <motion.div
          className="hidden sm:flex flex-col items-center glass-card rounded-3xl p-6 lg:p-8 w-full max-w-5xl border border-white/50 shadow-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Core Flow */}
          <div className="flex items-center justify-center w-full flex-wrap gap-2 lg:gap-4 mb-8">
            <Block title="Power Supply" subtitle="12V DC" />
            <HArrow />
            <Block title="PCB" subtitle="Circuit Board" />
            <HArrow />
            <Block
              title="Microcontroller"
              subtitle="ATmega / ARM"
              color="bg-medical-blue text-white border-none shadow-xl shadow-medical-blue/40 font-extrabold"
            />
            <HArrow />
            <Block title="Motor Driver" subtitle="H-Bridge" />
            <HArrow />
            <Block title="Stepper Motor" subtitle="NEMA 17" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 lg:gap-16">
            {/* Peripherals (Sensory & UI) */}
            <div className="flex flex-col items-center">
              <h4 className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Control & Monitoring</h4>
              <div className="flex items-center gap-2 lg:gap-4">
                <Block title="Display" subtitle="LCD / OLED" color="bg-blue-50 text-blue-800 border border-blue-200" />
                <Block title="Sensors" subtitle="Pressure, Flow, Air" color="bg-blue-50 text-blue-800 border border-blue-200" />
                <Block title="Alarm System" subtitle="Buzzer + LED" color="bg-red-50 text-red-700 border border-red-200" />
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

            {/* Output (Delivery) */}
            <div className="flex flex-col items-center mt-4 lg:mt-0">
              <h4 className="text-[10px] lg:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Fluid Delivery Mechanism</h4>
              <div className="flex items-center gap-2 lg:gap-4">
                <Block title="Rollers" subtitle="Peristaltic" />
                <HArrow />
                <Block title="IV Tube" subtitle="Silicone" />
                <HArrow />
                <Block
                  title="Patient"
                  subtitle="Drug Delivery"
                  color="bg-emerald-500 text-white border-none shadow-lg shadow-emerald-400/40"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
};

export default EngineeringSection;
