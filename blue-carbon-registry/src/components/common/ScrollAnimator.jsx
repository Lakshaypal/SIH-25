import React from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * A wrapper component that applies a CSS animation when it scrolls into view.
 * @param {React.ReactNode} children - The content to animate.
 * @param {string} animationClass - The Tailwind CSS animation class to apply (e.g., 'animate-fade-in-up').
 * @param {string} [className] - Optional additional classes for the wrapper div.
 * @param {number} [delay] - Optional delay in milliseconds for the animation start.
 */
const ScrollAnimator = ({ children, animationClass, className = '', delay = 0 }) => {
  const { ref, inView } = useInView({
    /**
     * triggerOnce: true means the animation will only play once.
     * Set to false if you want it to re-animate every time it enters the screen.
     */
    triggerOnce: true,
    /**
     * threshold: 0.1 means the animation will trigger when 10%
     * of the element is visible. Adjust as needed.
     */
    threshold: 0.1,
  });

  // Base classes set the initial state (invisible).
  // When 'inView' becomes true, the animationClass is applied.
  const classes = `transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'} ${inView ? animationClass : ''} ${className}`;

  return (
    <div
      ref={ref}
      className={classes}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimator;