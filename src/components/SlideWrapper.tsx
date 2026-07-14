import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SlideWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SlideWrapper: React.FC<SlideWrapperProps> = ({ children, className = '', id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div className={`slide ${className}`} id={id} ref={ref}>
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SlideWrapper;
