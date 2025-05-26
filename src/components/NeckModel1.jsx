import { useGLTF } from '@react-three/drei';

export default function Neck({ position, rotation, scale }) {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/neck1.glb`);


  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}