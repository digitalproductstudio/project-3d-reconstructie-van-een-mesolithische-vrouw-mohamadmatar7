import { useEffect, useState } from 'react';

export default function ARPage3() {
  const [isARJSLoaded, setIsARJSLoaded] = useState(false);

  useEffect(() => {
    // First, load A-Frame
    const aframeScript = document.createElement('script');
    aframeScript.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
    aframeScript.async = true;
    document.head.appendChild(aframeScript);

    // After A-Frame is loaded, load AR.js
    aframeScript.onload = () => {
      const arjsScript = document.createElement('script');
      arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
      arjsScript.async = true;
      document.head.appendChild(arjsScript);

      arjsScript.onload = () => {
        setIsARJSLoaded(true);
      };
    };

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script');
      scripts.forEach(script => {
        if (
          script.src.includes('aframe.min.js') ||
          script.src.includes('aframe-ar.js')
        ) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  if (!isARJSLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading AR components...</div>
      </div>
    );
  }

  return (
    <div className="ar-container relative w-full h-screen flex justify-center items-center">
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        renderer="logarithmicDepthBuffer: true;"
        vr-mode-ui="enabled: false"
      >
        {/* Hiro Marker */}
        <a-marker preset="hiro">
          {/* 3D Model */}
          <a-entity
            position="0 0 0"
            scale="10 10 10"
            gltf-model="/models/woman3.glb"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
          />
          
          {/* Text Label */}
          <a-text
            value="Mesolithic Woman"
            position="0 2 0"
            align="center"
            color="#000000"
            scale="2 2 2"
          />

          {/* Simple Platform */}
          <a-cylinder
            position="0 0.1 0"
            radius="1.5"
            height="0.2"
            color="#FFC65D"
          />
        </a-marker>

        {/* Camera */}
        <a-entity camera />
      </a-scene>

      <style jsx global>{`
        .ar-container {
          position: relative;
          width: 100%;
          height: 100vh;
          max-height: 100%;
          overflow: hidden;
          z-index: 2 !important;
        }
        
        .a-canvas {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
        }

        body {
          margin: 0;
          overflow: hidden;
        }

        #arjs-video {
          position: absolute !important;
          top: 0;
          left: 0;
          z-index: 0 !important;
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
} 