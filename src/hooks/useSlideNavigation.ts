import { useState, useEffect, useCallback, useRef } from 'react';

export function useSlideNavigation(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const scrollToSlide = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return;
    if (isScrolling.current) return;

    isScrolling.current = true;
    setCurrentSlide(index);

    const container = containerRef.current;
    if (container) {
      const slideHeight = container.clientHeight;
      container.scrollTo({
        top: slideHeight * index,
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    scrollToSlide(currentSlide + 1);
  }, [currentSlide, scrollToSlide]);

  const goPrev = useCallback(() => {
    scrollToSlide(currentSlide - 1);
  }, [currentSlide, scrollToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'Home':
          e.preventDefault();
          scrollToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, scrollToSlide, totalSlides]);

  // Wheel navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(wheelTimeout);

      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          goNext();
        } else if (e.deltaY < 0) {
          goPrev();
        }
      }, 50);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  // Touch navigation removed because it conflicts with native CSS scroll-snap,
  // which handles smooth swiping perfectly on mobile devices.

  // Comprehensive slide detection using every possible method.
  // Uses setInterval (not rAF which mobile can throttle),
  // scroll listeners on container + window + document,
  // and getBoundingClientRect for position detection.
  useEffect(() => {
    const detectCurrentSlide = () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      // Method 1: getBoundingClientRect - works regardless of scroll context
      const viewportCenter = window.innerHeight / 2;
      const children = container.children;

      let foundMethod1 = false;
      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setCurrentSlide(i);
          foundMethod1 = true;
          return;
        }
      }

      if (!foundMethod1) {
        // Method 2: scrollTop fallback
        const firstChild = children[0] as HTMLElement;
        if (firstChild) {
          const slideHeight = firstChild.offsetHeight || container.clientHeight;
          if (slideHeight > 0) {
            // Try container scrollTop
            let scrollTop = container.scrollTop;
            let source = 'container';
            // If container scrollTop is 0, try window/document
            if (scrollTop === 0 && children.length > 1) {
              scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
              source = 'window';
            }
            if (scrollTop > 0) {
              const newSlide = Math.round(scrollTop / slideHeight);
              if (newSlide >= 0 && newSlide < totalSlides) {
                setCurrentSlide(newSlide);
                return;
              }
            }
          }
        }
      }
    };

    // Run detection on an interval (immune to rAF throttling)
    const intervalId = setInterval(detectCurrentSlide, 200);

    // Also attach scroll listeners to every possible scroll target
    const handleGlobalScroll = () => detectCurrentSlide();
    
    window.addEventListener('scroll', handleGlobalScroll, { passive: true });
    document.addEventListener('scroll', handleGlobalScroll, { passive: true });

    // Run once immediately
    detectCurrentSlide();

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleGlobalScroll);
      document.removeEventListener('scroll', handleGlobalScroll);
    };
  }, [totalSlides]);

  // Fullscreen toggle with 'F' key
  useEffect(() => {
    const handleFullscreen = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }
    };

    window.addEventListener('keydown', handleFullscreen);
    return () => window.removeEventListener('keydown', handleFullscreen);
  }, []);

  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return {
    currentSlide,
    totalSlides,
    progress,
    goNext,
    goPrev,
    scrollToSlide,
    containerRef,
  };
}
