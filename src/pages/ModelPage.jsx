import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaRing, FaUndo } from 'react-icons/fa'; // ➡️ Toegevoegd: Undo icon
import WomanModel from '../components/WomanModel';
import ColorSegmentPicker from '../components/ColorSegmentPicker';
import Earring from '../components/Earring';

export default function ModelPage() {
  const [skinSlider, setSkinSlider] = useState(0.1);
  const [hairColor, setHairColor] = useState('#3b2f2f');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [intensity, setIntensity] = useState(1);
  const [showEarrings, setShowEarrings] = useState(false);

  const skinToneColors = ['#ffffff', '#f1c27d', '#dab28f', '#a8754f', '#8d5524', '#000000'];

  const getSkinColor = (sliderValue) => {
    const index = Math.round(sliderValue);
    return skinToneColors[index] || skinToneColors[0];
  };

  const handleReset = () => {
    setSkinSlider(0.1);
    setHairColor('#3b2f2f');
    setEyeColor('#000000');
    setIntensity(1);
    setShowEarrings(false);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[320px] h-[50vh] md:h-auto overflow-y-auto p-6 bg-white/50 backdrop-blur-md border-r border-white/30 shadow-md z-10 flex flex-col gap-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
          Pas het model aan
        </h2>

        <ColorSegmentPicker
          label="Huidkleur"
          value={skinSlider}
          onChange={setSkinSlider}
          options={skinToneColors}
          type="slider"
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

        {/* Modern Toggle for Oorringen */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FaRing className="text-gray-700 text-xl transform -rotate-45" />
            <span className="text-sm font-medium text-gray-700">Oorring</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showEarrings}
              onChange={() => setShowEarrings(!showEarrings)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-gray-700 transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Lichtintensiteit */}
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

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
        >
          <FaUndo /> Reset
        </button>
      </div>

      {/* 3D Model */}
      <div className="flex-1 h-full">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 3, 3]} intensity={intensity} />
          <Suspense fallback={null}>
            <WomanModel
              skinColor={getSkinColor(skinSlider)}
              hairColor={hairColor}
              eyeColor={eyeColor}
              scale={1.5}
              position={[0, 0, 0]}
              rotation={[-0.35, 0, 0]}
            />
            {showEarrings && (
              <>
                <Earring position={[1.15, -0.3, 0.7]} scale={[0.02, 0.02, 0.02]} rotation={[-0.2, Math.PI, -0.2]} />
              </>
            )}
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}

// Kleine helper component
function Control({ label, children }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}
