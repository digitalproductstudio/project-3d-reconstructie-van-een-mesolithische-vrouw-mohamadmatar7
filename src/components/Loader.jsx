import { Html } from '@react-three/drei';

export default function Loader() {
  return (
    <Html center>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-[#86561C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Html>
  );
}
