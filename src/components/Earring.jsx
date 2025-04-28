import { useGLTF } from '@react-three/drei';

export default function Earring({ position, rotation, scale }) {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/earring.glb`);

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}
