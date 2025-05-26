import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaRing, FaUndo, FaArrowsAlt } from 'react-icons/fa';
import { GiNecklaceDisplay } from 'react-icons/gi';
import { GiRing  } from 'react-icons/gi';

import { useSearchParams } from 'react-router-dom';
import { motion, useDragControls } from 'framer-motion';

import WomanModel from '../components/WomanModel';
import Loader from '../components/Loader';
import ColorSegmentPicker from '../components/ColorSegmentPicker';
import Earring from '../components/Earring';
import Neck from '../components/NeckModel';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default function ModelPage() {
  const [skinSlider, setSkinSlider] = useState(1.72);
  const [hairColor, setHairColor] = useState('#3b2f2f');
  const [eyeColor, setEyeColor] = useState('#000000');
  const [intensity, setIntensity] = useState(1);
  const [showEarrings, setShowEarrings] = useState(true);
  const [showNeck, setShowNeck] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const dragControls = useDragControls();
  const containerRef = useRef(null);

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
      neck: showNeck ? 'true' : 'false',
    });
  };

  useEffect(() => {
    const skinParam = searchParams.get('skin');
    const hairParam = searchParams.get('hair');
    const eyesParam = searchParams.get('eyes');
    const intensityParam = searchParams.get('intensity');
    const earringsParam = searchParams.get('earrings');
    const neckParam = searchParams.get('neck');

    if (skinParam) setSkinSlider(parseFloat(skinParam));
    if (hairParam) setHairColor(hairParam);
    if (eyesParam) setEyeColor(eyesParam);
    if (intensityParam) setIntensity(parseFloat(intensityParam));
    if (earringsParam) setShowEarrings(earringsParam === 'true');
    if (neckParam) setShowNeck(neckParam === 'true');


  }, [searchParams]);

  useEffect(() => {
    updateQueryParams();
  }, [skinSlider, hairColor, eyeColor, intensity, showEarrings, showNeck]);

  const handleReset = () => {
    setSkinSlider(1.72);
    setHairColor('#3b2f2f');
    setEyeColor('#000000');
    setIntensity(1);
    setShowEarrings(true);
    setShowNeck(true);
    updateQueryParams();
  };

  return (
    <div
      ref={containerRef}
      className="pt-6 md:pt-16 flex flex-col md:flex-row w-full h-screen overflow-hidden"
    >
      {/* 3D MODEL */}
      <div className="flex-1 h-full">
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 3, 3]} intensity={intensity} />
          <Suspense fallback={<Loader />}>
            <WomanModel
              skinColor={getSkinColor(skinSlider)}
              hairColor={hairColor}
              eyeColor={eyeColor}
              scale={10}
              position={isMobile ? [0, -1, 0] : [0, -2.2, 0]}
              rotation={[-0.35, 0, 0]}
            />
            {showEarrings && (
              <Earring
                position={isMobile ? [1.15, -0.75, 0.65] : [0.78, -0.3, -0.47]}
                scale={[0.012, 0.015, 0.015]}
                rotation={[-0.2, Math.PI, 0]}
              />
            )}
            {showNeck && (
            <Neck
              position={isMobile ? [0, -1.5, 0.5]
                : [0, -1.4, -0.525]}
              scale={0.13}
              rotation={[-0.64, 0, 0]}
            />
            )}
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

      {/* SIDEBAR */}
      {!isMobile ? (
        <motion.div
          drag
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragConstraints={containerRef}
          className="absolute top-17 left-4 z-50 bg-transparent  w-[320px] max-h-[90vh] overflow-y-auto p-4 md:p-6 flex flex-col gap-4 md:gap-6"
          style={{backdropFilter: 'blur(10px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}
        >
          <h2
            className="text-xl md:text-2xl font-semibold text-[#EEBD74] uppercase cursor-default flex items-center justify-center gap-2"
            style={{ textShadow: '2px 2px 2px #5C3A1E' }}
          >
            <FaArrowsAlt
              className="text-[#EEBD74] text-lg opacity-90 cursor-move"
              title="Sleep het paneel"
              onPointerDown={(e) => {
                document.body.style.userSelect = 'none';
                dragControls.start(e);
              }}
              onPointerUp={() => {
                document.body.style.userSelect = '';
              }}
            />
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

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GiRing  className="text-[#EEBD74] text-xl transform -rotate-45" />
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
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <GiNecklaceDisplay className="text-[#EEBD74] text-xl" />
              <span className="text-sm font-medium text-[#EEBD74]">Ketting</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showNeck}
                onChange={() => setShowNeck(!showNeck)}
              />
              <div className="w-11 h-6 bg-white rounded-full peer-checked:bg-[#86561C] transition-all"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-[#86561C] rounded-full transition-transform peer-checked:translate-x-5 peer-checked:bg-white"></div>
            </label>
          </div>

          <button
            onClick={handleReset}
            className="md:mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#86561C] hover:bg-[#6c4710] text-white rounded-md shadow-lg transition duration-200 ease-in-out"
          >
            <FaUndo /> Reset
          </button>
        </motion.div>
      ) : (
        <div className="w-full md:w-[320px] h-[45vh] md:h-auto overflow-y-auto p-4 md:p-6 shadow-md z-10 flex flex-col gap-4 md:gap-6 bg-transparent">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#EEBD74] text-center uppercase"
            style={{ textShadow: '2px 2px 2px #5C3A1E' }}
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

          <button
            onClick={handleReset}
            className="md:mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#86561C] hover:bg-[#6c4710] text-white rounded-md shadow-lg transition duration-200 ease-in-out"
          >
            <FaUndo /> Reset
          </button>
        </div>
      )}
    </div>
  );
}
