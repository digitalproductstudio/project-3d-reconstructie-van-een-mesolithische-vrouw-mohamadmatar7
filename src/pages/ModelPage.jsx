import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WomanModel from '../components/WomanModel';
import ColorSegmentPicker from '../components/ColorSegmentPicker';


export default function ModelPage() {
  const [skinColor, setSkinColor] = useState('#FFFFFF');
  const [hairColor, setHairColor] = useState('#3b2f2f');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [intensity, setIntensity] = useState(1);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-[320px] h-[50vh] md:h-auto overflow-y-auto p-6 bg-white/50 backdrop-blur-md border-r border-white/30 shadow-md z-10 flex flex-col gap-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
          Pas het model aan
        </h2>

        {/*
        <Control label="Huidkleur">
          <input
            type="color"
            value={skinColor}
            onChange={(e) => setSkinColor(e.target.value)}
            className="w-full h-12 rounded-md border shadow cursor-pointer"
          />
        </Control>

        <Control label="Haarkleur">
          <input
            type="color"
            value={hairColor}
            onChange={(e) => setHairColor(e.target.value)}
            className="w-full h-12 rounded-md border shadow cursor-pointer"
          />
        </Control>

        <Control label="Oogkleur">
          <input
            type="color"
            value={eyeColor}
            onChange={(e) => setEyeColor(e.target.value)}
            className="w-full h-12 rounded-md border shadow cursor-pointer"
          />
        </Control>
        */}

        <ColorSegmentPicker
          label="Huidkleur"
          value={skinColor}
          onChange={setSkinColor}
          options={['#f1c27d', '#dab28f', '#a8754f', '#8d5524']}
        />

        <ColorSegmentPicker
          label="Haarkleur"
          value={hairColor}
          onChange={setHairColor}
          options={['#2e2e2e', '#4a2f27', '#b55239', '#8b5e3c']}
        />

        <ColorSegmentPicker
          label="Oogkleur"
          value={eyeColor}
          onChange={setEyeColor}
          options={['#5f9ea0', '#1c1c1c', '#654321', '#a9c9ff']}
        />

        <Control label="Lichtintensiteit">
          <input
            type="range"
            min="0"
            max="8"
            step="0.1"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-md cursor-pointer"
          />
        </Control>
      </div>

      {/* 3D Model */}
      <div className="flex-1 h-full">
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

// Componentje voor consistent UI design
function Control({ label, children }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
