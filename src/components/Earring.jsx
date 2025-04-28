import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Earring({ position, rotation, scale }) {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/earring.glb`);
  const earringRef = useRef();

  useEffect(() => {
    // Fade in animation
    gsap.fromTo(
      earringRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  }, []);

  return (
    <primitive
      ref={earringRef}
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}