import React, { useState, useEffect, useRef } from 'react';
import { FaUserSecret } from 'react-icons/fa';

const CursorFollower = () => {
  // State for the follower's current position
  const [position, setPosition] = useState({ x: -100, y: -100 });
  // Ref to store the target position (the actual cursor position)
  // We use a ref here to avoid re-rendering the component on every mouse move
  const targetPosition = useRef({ x: 0, y: 0 });
  // Ref to store the request ID for the animation frame
  const animationFrameId = useRef(null);
  
  // The "springiness" of the follow effect. Lower value = more delay.
  const smoothing = 0.1;

  useEffect(() => {
    // 1. Event listener to update the target position
    const handleMouseMove = (event) => {
      targetPosition.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 2. Animation loop to smoothly move the follower
    const animate = () => {
      // Calculate the distance to the target
      const dx = targetPosition.current.x - position.x;
      const dy = targetPosition.current.y - position.y;
      
      // Move a fraction of the distance each frame
      const newX = position.x + dx * smoothing;
      const newY = position.y + dy * smoothing;

      setPosition({ x: newX, y: newY });

      // Continue the loop
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // 3. Cleanup function to remove listener and cancel animation
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // We run this effect only once on mount, so the dependency array is empty.
  }, []); // Note: position is not in the dependency array to avoid re-running the effect.

   return (
    <div
      className="fixed top-0 left-0 rounded-full flex items-center justify-center 
                 w-32 h-32 transition-opacity duration-300 z-[9999]" // <-- ADD z-[9999] HERE
      style={{
        transform: `translate3d(${position.x - 64}px, ${position.y - 64}px, 0)`,
        pointerEvents: 'none',
      }}
    >
      {/* The glowing effect */}
      <div className="absolute w-full h-full bg-green/10 rounded-full filter blur-xl"></div>
      
      {/* The icon itself */}
      <FaUserSecret className="text-green text-5xl opacity-80" />
    </div>
  );
};

export default CursorFollower;