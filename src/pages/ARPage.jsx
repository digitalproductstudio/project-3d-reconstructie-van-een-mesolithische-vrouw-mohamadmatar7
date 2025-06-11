import { useEffect, useState, useRef } from 'react';

export default function ARPage() {
    const [isARJSLoaded, setIsARJSLoaded] = useState(false);
    const [motionPermissionGranted, setMotionPermissionGranted] = useState(false);
    const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
    const cleanupRef = useRef([]);
    const originalBodyStyles = useRef({});

    useEffect(() => {
        // Store original body styles
        originalBodyStyles.current = {
            margin: document.body.style.margin,
            marginTop: document.body.style.marginTop,
            marginLeft: document.body.style.marginLeft,
            overflow: document.body.style.overflow,
            height: document.body.style.height,
            position: document.body.style.position,
            transform: document.body.style.transform,
            width: document.body.style.width,
            minWidth: document.body.style.minWidth,
            maxWidth: document.body.style.maxWidth,
            background: document.body.style.background,
            cssText: document.body.style.cssText
        };

        // Cleanup function to run when component unmounts
        return () => {
            cleanupRef.current.forEach(cleanup => cleanup());
            cleanupRef.current = [];
            
            // Stop all video streams
            const videoElements = document.querySelectorAll('video');
            videoElements.forEach(video => {
                if (video.srcObject) {
                    const tracks = video.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                    video.srcObject = null;
                }
            });
            
            // Remove AR.js video element
            const arVideo = document.getElementById('arjs-video');
            if (arVideo) {
                arVideo.remove();
            }
            
            // Remove scripts
            const scripts = document.querySelectorAll('script');
            scripts.forEach((script) => {
                if (script.src && (script.src.includes('aframe.min.js') || script.src.includes('aframe-ar.js'))) {
                    try {
                        document.head.removeChild(script);
                    } catch (e) {
                        // Script may already be removed
                    }
                }
            });
            
            // Restore original body styles
            Object.keys(originalBodyStyles.current).forEach(key => {
                if (key !== 'cssText') {
                    document.body.style[key] = originalBodyStyles.current[key] || '';
                }
            });
            
            // Remove any mutation observers that might still be running
            if (window.arObservers) {
                window.arObservers.forEach(observer => observer.disconnect());
                delete window.arObservers;
            }
        };
    }, []);

    useEffect(() => {
        if (!motionPermissionGranted || !cameraPermissionGranted) return;

        const aframeScript = document.createElement('script');
        aframeScript.src = 'https://aframe.io/releases/1.4.2/aframe.min.js';
        aframeScript.async = true;
        document.head.appendChild(aframeScript);

        aframeScript.onload = () => {
            const arjsScript = document.createElement('script');
            arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
            arjsScript.async = true;
            document.head.appendChild(arjsScript);

            arjsScript.onload = () => {
                setIsARJSLoaded(true);

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

                const widthObserver = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                            const style = document.body.style;
                            if (style.width && style.width !== '100%') {
                                style.width = '100%';
                            }
                        }
                    });
                });

                widthObserver.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['style']
                });

                const observer = new MutationObserver(() => {
                    fixBodyStyles();
                });

                observer.observe(document.body, {
                    attributes: true,
                    attributeFilter: ['style'],
                });

                // Store observers for cleanup
                window.arObservers = [observer, widthObserver];

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
                            // iOS specific fixes
                            WebkitTransform: 'translateZ(0)',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                        });
                    }
                }, 1000);
            };
        };

        cleanupRef.current.push(() => {
            try {
                if (aframeScript.parentNode) document.head.removeChild(aframeScript);
            } catch (e) {}
        });

        return () => {
            const scripts = document.querySelectorAll('script');
            scripts.forEach((script) => {
                if (script.src && (script.src.includes('aframe.min.js') || script.src.includes('aframe-ar.js'))) {
                    try {
                        document.head.removeChild(script);
                    } catch (e) {}
                }
            });
        };
    }, [motionPermissionGranted, cameraPermissionGranted]);

    const requestMotionPermission = async () => {
        try {
            // Request camera permission first for iOS
            await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            }).then(stream => {
                // Stop the stream immediately after getting permission
                stream.getTracks().forEach(track => track.stop());
                setCameraPermissionGranted(true);
            });

            // Then request motion permission
            if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                const response = await DeviceMotionEvent.requestPermission();
                if (response === 'granted') {
                    setMotionPermissionGranted(true);
                }
            } else {
                setMotionPermissionGranted(true); // Already granted or not required
            }
        } catch (error) {
            console.error('Permission error:', error);
            // Fallback - try to proceed anyway
            setCameraPermissionGranted(true);
            setMotionPermissionGranted(true);
        }
    };

    if (!motionPermissionGranted || !cameraPermissionGranted) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white z-50">
                <div className="text-center">
                    <p className="mb-6 text-lg">This immersive website requires access to your device motion sensors.</p>
                    <button
                        onClick={requestMotionPermission}
                        className="bg-blue-600 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
                    >
                        Allow Motion Access
                    </button>
                </div>
            </div>
        );
    }

    if (!isARJSLoaded) {
        return (
            <div className="flex items-center justify-center h-[50vh] bg-gray-100 m-4 rounded">
                <div className="text-xl text-gray-600">Loading AR components...</div>
            </div>
        );
    }

    return (
        <div className="ar-page-container w-full px-4 py-12 flex flex-col items-center justify-start">
            <h2 className="text-3xl font-semibold text-white mb-6 mt-8">
                Bekijk je model in AR
            </h2>

            <div
                id="ar-video-container"
                className="relative w-[80%] h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white bg-black"
            >
                <a-scene
                    embedded
                    arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; cameraParametersUrl: https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/camera_para.dat;"
                    renderer="logarithmicDepthBuffer: true; antialias: true; colorManagement: true;"
                    vr-mode-ui="enabled: false"
                    device-orientation-permission-ui="enabled: false"
                >
                    <a-marker preset="hiro" smooth="true" smoothCount="10" smoothTolerance="0.01" smoothThreshold="5">
                        <a-entity
                            position="0 0 0"
                            scale="5 5 5"
                            gltf-model={`${import.meta.env.BASE_URL}models/woman3.glb`}
                            animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
                        />
                        <a-cylinder
                            position="0 0.1 0"
                            radius="1"
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
                    /* iOS specific fixes */
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
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
                    width: 100% !important;
                    min-width: 100% !important;
                    max-width: 100% !important;
                }

                body {
                    transform: none !important;
                    background: none !important;
                    width: 100% !important;
                    min-width: 100% !important;
                    max-width: 100% !important;
                }

                /* iOS Safari specific video fixes */
                @supports (-webkit-touch-callout: none) {
                    #arjs-video {
                        -webkit-transform: translateZ(0) !important;
                        transform: translateZ(0) !important;
                        -webkit-backface-visibility: hidden !important;
                        backface-visibility: hidden !important;
                        -webkit-transform-style: preserve-3d !important;
                        transform-style: preserve-3d !important;
                    }
                }
            `}</style>
        </div>
    );
}