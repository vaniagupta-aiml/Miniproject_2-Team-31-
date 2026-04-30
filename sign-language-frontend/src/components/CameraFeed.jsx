import React, { useEffect, useRef, useState } from "react";

export default function CameraFeed({ enabled, onError, onVideoReady }) {
  const videoRef = useRef(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (!enabled) {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    let stream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {
            /* ignore autoplay policy */
          });
          onVideoReady?.(videoRef.current);
        }
      } catch (err) {
        setPermissionDenied(true);
        onError?.(err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [enabled, onError]);

  return (
    <div className="camera">
      <div className="camera__wrapper">
        <video
          ref={videoRef}
          className="camera__video"
          playsInline
          muted
          autoPlay
          aria-label="Camera preview"
        />
        {permissionDenied && (
          <div className="camera__overlay">
            <p>Camera access denied. Please allow camera permissions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
