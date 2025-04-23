import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WomanModel from '../components/WomanModel';

export default function ModelPage() {
  const [skinColor, setSkinColor] = useState('#FFFFFF');
  const [hairColor, setHairColor] = useState('#3b2f2f');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [intensity, setIntensity] = useState(1);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-gray-200">
      {/* Sidebar controls */}
      <div className="w-full md:w-1/4 p-6 bg-white/40 backdrop-blur-md shadow-xl border-r border-white/20 flex flex-col justify-center items-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 tracking-wide">Pas het model aan</h2>

            <div className="w-full flex flex-col items-start gap-2">
                <label className="text-sm text-gray-700 font-medium">Huidkleur</label>
                <input
                type="color"
                value={skinColor}
                onChange={(e) => setSkinColor(e.target.value)}
                className="w-full h-12 rounded-md border border-gray-300 shadow-inner cursor-pointer transition hover:scale-[1.02]"
                />
            </div>

            <div className="w-full flex flex-col items-start gap-2">
                <label className="text-sm text-gray-700 font-medium">Haarkleur</label>
                <input
                type="color"
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
                className="w-full h-12 rounded-md border border-gray-300 shadow-inner cursor-pointer transition hover:scale-[1.02]"
                />
            </div>

            <div className="w-full flex flex-col items-start gap-2">
                <label className="text-sm text-gray-700 font-medium">Oogkleur</label>
                <input
                type="color"
                value={eyeColor}
                onChange={(e) => setEyeColor(e.target.value)}
                className="w-full h-12 rounded-md border border-gray-300 shadow-inner cursor-pointer transition hover:scale-[1.02]"
                />
            </div>

            <div className="w-full flex flex-col items-start gap-2">
                <label className="text-sm text-gray-700 font-medium">Lichtintensiteit</label>
                <input
                type="range"
                min="0"
                max="8"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className="w-full h-2 rounded-md border border-gray-300 shadow-inner cursor-pointer transition hover:scale-[1.02]"
                />
                </div>
        </div>


      {/* 3D model viewer */}
      <div className="flex-1">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 3, 3]} intensity={intensity} />
          <Suspense fallback={null}>
            <WomanModel
              skinColor={skinColor}
              hairColor={hairColor}
              eyeColor={eyeColor}
              scale={1.5}
              position={[0, 0, 0]}
              rotation={[-0.35, 0, 0]}
            />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}
