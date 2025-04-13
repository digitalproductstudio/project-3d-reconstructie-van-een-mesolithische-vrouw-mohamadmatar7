import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function WomanModel({ skinColor, hairColor, eyeColor, ...props }) {
  const { scene } = useGLTF('/models/woman.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();

        if (child.name === 'Object_5') child.material.color.set(skinColor); // huid
        if (child.name === 'Object_7') child.material.color.set(hairColor);  // haar
        if (child.name === 'Object_6') child.material.color.set(eyeColor);   // ogen
      }
    });
  }, [scene, skinColor, hairColor, eyeColor]);

  return <primitive object={scene} {...props} />;
}
