import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import '@tensorflow/tfjs-backend-webgl';

export default function ARPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const setupCamera = async () => {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      video.srcObject = stream;

      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.play();
          resolve(video);
        };
      });
    };

    const runFaceMesh = async () => {
      await tf.setBackend('webgl');
      await tf.ready();

      const video = await setupCamera();
      const model = await facemesh.load();

      const detect = async () => {
        if (
          video.readyState === 4 &&
          video.videoWidth > 0 &&
          video.videoHeight > 0
        ) {
          const predictions = await model.estimateFaces(video);

          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);

        
          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);

          if (predictions.length > 0) {
            predictions.forEach((prediction) => {
              const keypoints = prediction.scaledMesh;

              ctx.fillStyle = 'red';
              for (let i = 0; i < keypoints.length; i++) {
                const [x, y] = keypoints[i];
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, 2 * Math.PI);
                ctx.fill();
              }
            });
          }

          ctx.restore(); 
        }

        requestAnimationFrame(detect);
      };

      detect();
    };

    runFaceMesh();
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <video
        ref={videoRef}
        className="absolute rounded opacity-70"
        autoPlay
        muted
        playsInline
        style={{ width: 640, height: 480, transform: 'scaleX(-1)' }}
      />
      <canvas
        ref={canvasRef}
        className="absolute"
        style={{ width: 640, height: 480 }}
      />
      <p className="absolute top-4 left-4 text-white text-sm bg-black/60 px-3 py-1 rounded">
        AR FaceMesh active
      </p>
    </div>
  );
}
