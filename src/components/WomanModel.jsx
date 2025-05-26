import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function WomanModel({ skinColor, hairColor, eyeColor, ...props }) {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/woman2.glb`);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();

        // Set skin color
        if (
          child.name === 'Face_mush_Face_0' ||
          child.name === 'Face_mush_Torso_0' ||
          child.name === 'Face_mush'
        ) {
          child.material.color.set(skinColor);
        }

        // Set hair color
        if (
          child.name === 'Hair_mush_Hair_Cap_0' ||
          child.name === 'Hair_mush_FrontR_Mat_0' ||
          child.name === 'Hair_mush_SideR_Mat_0' ||
          child.name === 'Hair_mush_FrontL_Mat_0' ||
          child.name === 'Hair_mush_SideL_Mat_0' ||
          child.name === 'Hair_mush_Back_Mat_0' ||
          child.name === 'Hair_mush_FrontL_f_Mat_0' ||
          child.name === 'Hair_mush_Back_f_Mat_0' ||
          child.name === 'Hair_mush_SideR_f_Mat_0' ||
          child.name === 'Hair_mush_SideL_f_Mat_0'
        ) {
          child.material.color.set(hairColor);
        }

        // Set eye color (iris/pupil only, not cornea/sclera)
        if (
          child.name.includes('Iris') ||
          child.name.includes('Pupil')
        ) {
          if (child.material.map) {
            child.material.map = null;
            child.material.needsUpdate = true;
          }

          child.material.transparent = false;
          child.material.opacity = 1;
          child.material.color.set(eyeColor);
        }

        // Optional: for debugging
        // console.log(child.name);
      }
    });
  }, [scene, skinColor, hairColor, eyeColor]);

  return <primitive object={scene} {...props} />;
}
