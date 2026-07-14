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
      const slideHeight = window.innerHeight;
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

  // Touch navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const diffY = touchStartY - touchEndY;
      const diffX = touchStartX - touchEndX;

      // Only trigger if vertical swipe is dominant
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
        if (diffY > 0) {
          goNext();
        } else {
          goPrev();
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Scroll-based slide detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideHeight = window.innerHeight;
      const scrollTop = container.scrollTop;
      const newSlide = Math.round(scrollTop / slideHeight);
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < totalSlides) {
        setCurrentSlide(newSlide);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentSlide, totalSlides]);

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
