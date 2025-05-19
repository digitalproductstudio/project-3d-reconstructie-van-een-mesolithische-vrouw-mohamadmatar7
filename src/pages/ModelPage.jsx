import { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaRing, FaUndo } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import WomanModel from '../components/WomanModel';
import Loader from '../components/Loader';
import ColorSegmentPicker from '../components/ColorSegmentPicker';
import Earring from '../components/Earring';

// Mobile screen detection hook
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default function ModelPage() {
  const [skinSlider, setSkinSlider] = useState(0.1);
  const [hairColor, setHairColor] = useState('#3b2f2f');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [intensity, setIntensity] = useState(1);
  const [showEarrings, setShowEarrings] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const skinToneColors = ['#ffffff', '#f1c27d', '#dab28f', '#a8754f', '#8d5524', '#000000'];

  const getSkinColor = (sliderValue) => {
    const index = Math.round(sliderValue);
    return skinToneColors[index] || skinToneColors[0];
  };

  const updateQueryParams = () => {
    setSearchParams({
      skin: skinSlider,
      hair: hairColor,
      eyes: eyeColor,
      intensity: intensity,
      earrings: showEarrings ? 'true' : 'false',
    });
  };

  // When the component mounts, set state from the URL params
  useEffect(() => {
    const skinParam = searchParams.get('skin');
    const hairParam = searchParams.get('hair');
    const eyesParam = searchParams.get('eyes');
    const intensityParam = searchParams.get('intensity');
    const earringsParam = searchParams.get('earrings');

    if (skinParam) setSkinSlider(parseFloat(skinParam));
    if (hairParam) setHairColor(hairParam);
    if (eyesParam) setEyeColor(eyesParam);
    if (intensityParam) setIntensity(parseFloat(intensityParam));
    if (earringsParam) setShowEarrings(earringsParam === 'true');
  }, [searchParams]);

  const handleReset = () => {
    setSkinSlider(0.1);
    setHairColor('#3b2f2f');
    setEyeColor('#000000');
    setIntensity(1);
    setShowEarrings(false);
    updateQueryParams(); // Reset the URL query params as well
  };

  // Update query params when any of the values change
  useEffect(() => {
    updateQueryParams();
  }, [skinSlider, hairColor, eyeColor, intensity, showEarrings]);

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-[320px] h-[55vh] md:h-auto overflow-y-auto p-4 md:p-6 shadow-md z-10 flex flex-col gap-4 md:gap-6">
        <h2
          className="text-xl md:text-2xl font-semibold text-[#EEBD74] text-center uppercase"
          style={{
            textShadow: '2px 2px 2px #5C3A1E',
          }}
        >
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
            <FaRing className="text-[#EEBD74] text-xl transform -rotate-45" />
            <span className="text-sm font-medium text-[#EEBD74]">Oorring</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showEarrings}
              onChange={() => setShowEarrings(!showEarrings)}
            />
            <div className="w-11 h-6 bg-white rounded-full peer-checked:bg-[#86561C] transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-[#86561C] rounded-full transition-transform peer-checked:translate-x-5 peer-checked:bg-white"></div>
          </label>
        </div>

        {/* Lichtintensiteit 
        <Control label="Lichtintensiteit">
          <input
            type="range"
            min="0"
            max="8"
            step="0.1"
            value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full h-2 bg-transparent border-2 border-[#7A3D02] rounded-full cursor-pointer appearance-none outline-none"
            style={{
              background: `linear-gradient(to right, #7A3D02 ${intensity * 12.5}%, #c6893b 0%)`,
            }}
          />
        </Control>
        */}

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="md:mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#86561C] hover:bg-[#6c4710] text-white rounded-md shadow-lg transition duration-200 ease-in-out"
        >
          <FaUndo /> Reset
        </button>
      </div>

      {/* 3D Model */}
      <div className="flex-1 h-full">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 3, 3]} intensity={intensity} />
          <Suspense fallback={<Loader />}>
            <WomanModel
              skinColor={getSkinColor(skinSlider)}
              hairColor={hairColor}
              eyeColor={eyeColor}
              scale={1.5}
              position={isMobile ? [0, -0.5, 0] : [0, 0, 0]}
              rotation={[-0.35, 0, 0]}
            />
            {showEarrings && (
              <>
                <Earring position={isMobile ? [1.15, -0.75, 0.65] : [1.15, -0.3, 0.7]} 
                scale={[0.02, 0.02, 0.02]} rotation={[-0.2, Math.PI, -0.2]} />
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
      <label className="text-sm font-medium text-[#EEBD74]">{label}</label>
      {children}
    </div>
  );
}
