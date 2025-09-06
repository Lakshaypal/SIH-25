import React, { useState, useRef, useCallback } from 'react';
import { FaCamera, FaMapMarkerAlt, FaSync } from 'react-icons/fa';

const GeoCamera = ({ onCapture }) => {
  const [imageData, setImageData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = useCallback(async () => {
    setError('');
    setImageData(null);
    setLocation(null);
    setIsCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Prefer back camera
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
      setIsCapturing(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsCapturing(false);
    }
  }, []);

  const capturePhoto = () => {
    if (videoRef.current) {
      setError('');
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImageData(dataUrl);
      
      // Get location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          // Pass data up to parent form
          onCapture({ imageData: dataUrl, location: { lat: latitude, lon: longitude } });
          stopCamera();
        },
        () => {
          setError('Could not get location. Please enable location services.');
          onCapture({ imageData: dataUrl, location: null }); // Still pass image data
          stopCamera();
        }
      );
    }
  };

  return (
    <div className="p-4 border-2 border-dashed border-lightest-navy rounded-lg text-center">
      {!isCapturing && !imageData && (
        <button onClick={startCamera} className="w-full flex items-center justify-center p-6 text-green">
          <FaCamera className="w-10 h-10 mr-4" />
          <span className="text-xl font-semibold">Start Geo-tagged Camera</span>
        </button>
      )}

      {isCapturing && (
        <div className="space-y-4">
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-md" />
          <button onClick={capturePhoto} className="w-full bg-green text-navy font-bold py-2 px-4 rounded hover:bg-opacity-90">
            Take Picture
          </button>
        </div>
      )}

      {imageData && (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-lightest-slate">Capture Successful</h3>
            <img src={imageData} alt="Captured" className="w-full rounded-md" />
            {location && (
                <div className="flex items-center justify-center text-sm bg-light-navy p-2 rounded">
                    <FaMapMarkerAlt className="text-green mr-2"/>
                    <span>Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}</span>
                </div>
            )}
            <button onClick={startCamera} className="flex items-center justify-center text-green">
                <FaSync className="mr-2"/> Retake
            </button>
        </div>
      )}
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
};

export default GeoCamera;