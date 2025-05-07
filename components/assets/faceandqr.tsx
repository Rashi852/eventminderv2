"use client"



import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';

// ... (keep interfaces and other constants)
interface FaceResult {
  name: string;
  confidence: number;
}


const FaceRecognizerAndQr = (eventid: { eventid: string }) => {
  const faceVideoRef = useRef<HTMLVideoElement>(null);
  const qrVideoRef = useRef<HTMLVideoElement>(null);
  const faceCanvasRef = useRef<HTMLCanvasElement>(null);
  const [faceMatcher, setFaceMatcher] = useState<faceapi.FaceMatcher | null>(null);
  const [results, setResults] = useState<FaceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qrContent, setQrContent] = useState<string | null>(null);
  const [mode, setMode] = useState<'face' | 'qr'>('qr');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);
  const faceIntervalId = useRef<NodeJS.Timeout | null>(null);

  // Load models and initialize
  useEffect(() => {
    const initialize = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        ]);

        const data = await axios.post("/api/moderator/face", eventid).then((res) => res.data);
        const labeledDescriptors = data.res.map((face: any) =>
          new faceapi.LabeledFaceDescriptors(
            `user_${face.attendee.fname}`,
            [new Float32Array(face.attendee.Face)]
          )
        );
        setFaceMatcher(new faceapi.FaceMatcher(labeledDescriptors));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to initialize system');
        setLoading(false);
      }
    };
    initialize();
  }, [eventid]);

  // Handle mode changes
  useEffect(() => {
    const initCamera = async () => {
      try {
        if (!stream) {
          const newStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          setStream(newStream);
        }
      } catch (err) {
        console.error(err);
        setError('Camera access denied');
      }
    };

    const cleanupPreviousMode = () => {
      if (faceIntervalId.current) clearInterval(faceIntervalId.current);
      if (scannerControlsRef.current) scannerControlsRef.current.stop();
      setQrContent(null);
      setResults([]);
    };

    cleanupPreviousMode();
    initCamera();

    return () => cleanupPreviousMode();
  }, [mode, stream]);

  // Start face detection
  useEffect(() => {
    if (mode === 'face' && stream && faceMatcher && faceVideoRef.current) {
      faceVideoRef.current.srcObject = stream;

      faceIntervalId.current = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(faceVideoRef.current!)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const results = detections.map(face => {
          const bestMatch = faceMatcher.findBestMatch(face.descriptor);
          return {
            name: bestMatch.label,
            confidence: Math.round((1 - bestMatch.distance) * 100)
          };
        });
        
        setResults(results);
        updateFaceCanvas(detections, results);
      }, 100);
    }
  }, [mode, stream, faceMatcher]);

  // Start QR scanning
  useEffect(() => {
    if (mode === 'qr' && stream && qrVideoRef.current) {
      qrVideoRef.current.srcObject = stream;
      const codeReader = new BrowserQRCodeReader();

      codeReader.decodeFromVideoElement(
        qrVideoRef.current,
        (result, error) => {
          if (result) setQrContent(result.getText());
        }
      ).then((controls) => {
        scannerControlsRef.current = controls;
      }).catch((err) => {
        console.error('Error initializing QR scanner:', err);
      });
    }
  }, [mode, stream]);

  const updateFaceCanvas = (
    detections: faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection; }, faceapi.FaceLandmarks68>>[],
    results: FaceResult[]
  ) => {
    if (!faceVideoRef.current || !faceCanvasRef.current) return;

    const canvas = faceCanvasRef.current;
    const video = faceVideoRef.current;
    const displaySize = { width: video.offsetWidth, height: video.offsetHeight };

    faceapi.matchDimensions(canvas, displaySize);
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    resizedDetections.forEach((detection, i) => {
      const box = detection.detection.box;
      const text = `${results[i].name} (${results[i].confidence}%)`;
      
      new faceapi.draw.DrawBox(box, { 
        label: text,
        boxColor: '#00ff00',
        lineWidth: 2
      }).draw(canvas);
    });
  };

  if (loading) return <div>Loading recognition system...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="recognizer">
      <div className="mode-selector">
        <button onClick={() => setMode('face')} disabled={mode === 'face'}>
          Face Recognition
        </button>
        <button onClick={() => setMode('qr')} disabled={mode === 'qr'}>
          QR Scanner
        </button>
      </div>

      {mode === 'face' ? (
        <div style={{ position: 'relative' }}>
          <video ref={faceVideoRef} autoPlay muted playsInline />
          <canvas ref={faceCanvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
          <div className="results">
            <h3>Recognized Faces:</h3>
            <ul>
              {results.map((result, i) => (
                <li key={i}>
                  {result.name} - {result.confidence}% confidence
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <video ref={qrVideoRef} autoPlay muted playsInline />
          <div className="qr-results">
            <h3>QR Code Content:</h3>
            {qrContent ? (
              <div className="qr-content">{qrContent}</div>
            ) : (
              <div className="qr-prompt">Scanning QR code...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceRecognizerAndQr;