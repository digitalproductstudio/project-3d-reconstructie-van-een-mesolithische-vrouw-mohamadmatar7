import { useEffect, useState } from 'react';

export default function ARPage() {
    const [isARJSLoaded, setIsARJSLoaded] = useState(false);

    useEffect(() => {
        // Load A-Frame
        const aframeScript = document.createElement('script');
        aframeScript.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
        aframeScript.async = true;
        document.head.appendChild(aframeScript);

        aframeScript.onload = () => {
            // Load AR.js
            const arjsScript = document.createElement('script');
            arjsScript.src =
                'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
            arjsScript.async = true;
            document.head.appendChild(arjsScript);

            arjsScript.onload = () => {
                setIsARJSLoaded(true);

                // Force override any body hacks from AR.js
                const fixBodyStyles = () => {
                    document.body.style.margin = '0';
                    document.body.style.marginTop = '0px';
                    document.body.style.marginLeft = '0px';
                    document.body.style.overflow = 'auto';
                    document.body.style.height = '100%';
                    document.body.style.position = 'static';
                    document.body.style.transform = 'none';
                };

                fixBodyStyles();

                // Observe body and undo any AR.js changes
                const observer = new MutationObserver(() => {
                    fixBodyStyles();
                });

                observer.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['style'],
                });

                // Move AR.js video into our container
                setTimeout(() => {
                    const arVideo = document.getElementById('arjs-video');
                    const container = document.getElementById('ar-video-container');
                    if (arVideo && container && !container.contains(arVideo)) {
                        container.appendChild(arVideo);
                        Object.assign(arVideo.style, {
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            margin: '0',
                            zIndex: '0',
                            borderRadius: '12px',
                        });
                    }
                }, 1000);

                // Cleanup observer on unmount
                return () => observer.disconnect();
            };
        };

        return () => {
            const scripts = document.querySelectorAll('script');
            scripts.forEach((script) => {
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
            <div className="flex items-center justify-center h-[50vh] bg-gray-100 m-4 rounded">
                <div className="text-xl text-gray-600">Loading AR components...</div>
            </div>
        );
    }

    return (
        <div className="ar-page-container w-full  px-4 py-12 flex flex-col items-center justify-start">
            <h2 className="text-3xl font-semibold text-white mb-6 mt-8 ">
                Bekijk je model in AR
            </h2>

            <div
                id="ar-video-container"
                className="relative w-[80%] h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white bg-black"
            >
                <a-scene
                    embedded
                    arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
                    renderer="logarithmicDepthBuffer: true;"
                    vr-mode-ui="enabled: false"
                >
                    <a-marker preset="hiro">
                        <a-entity
                            position="0 0 0"
                            scale="5 5 5"
                            gltf-model="/models/woman3.glb"
                            animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
                        />
                        <a-cylinder
                            position="0 0.1 0"
                            radius="1.5"
                            height="0.2"
                            color="#ebe8dc"
                        />
                    </a-marker>

                    <a-entity camera />
                </a-scene>
            </div>

            <style jsx global>{`
        #arjs-video {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          z-index: 0 !important;
          margin: 0 !important;
          border-radius: 12px !important;
        }
 
        .a-scene,
        .a-canvas {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 1 !important;
        }

        #ar-video-container {
          width: 100% !important;
          height: 100vh !important;
        }
 
        html,
        body,
        #root {
        height: 100% !important;
        max-height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        position: relative !important;
        }
        
        body {
        transform: none !important;
        background: none !important;
        }
 
      `}</style>
        </div>
    );
}