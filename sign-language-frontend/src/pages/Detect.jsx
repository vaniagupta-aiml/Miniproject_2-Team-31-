import React, { useState, useRef } from "react";
import CameraFeed from "../components/CameraFeed";
import OutputBox from "../components/OutputBox";
import { Hands } from "@mediapipe/hands";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

export default function Detect() {
  const [cameraOn, setCameraOn] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const videoRef = useRef(null);
  const handsRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const [detecting, setDetecting] = useState(false);

  const speak = (text) => {
    if (voiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const classifyGesture = (landmarks) => {
    if (!landmarks || landmarks.length === 0) return "No hand detected";

    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbIp = landmarks[3];
    const thumbMcp = landmarks[2];
    const indexTip = landmarks[8];
    const indexPip = landmarks[7];
    const indexMcp = landmarks[6];
    const middleTip = landmarks[12];
    const middlePip = landmarks[11];
    const middleMcp = landmarks[10];
    const ringTip = landmarks[16];
    const ringPip = landmarks[15];
    const ringMcp = landmarks[14];
    const pinkyTip = landmarks[20];
    const pinkyPip = landmarks[19];
    const pinkyMcp = landmarks[18];

    const isFingerExtended = (tip, pip, mcp) => tip.y < pip.y && pip.y < mcp.y;

    const thumbExtended = isFingerExtended(thumbTip, thumbIp, thumbMcp);
    const indexExtended = isFingerExtended(indexTip, indexPip, indexMcp);
    const middleExtended = isFingerExtended(middleTip, middlePip, middleMcp);
    const ringExtended = isFingerExtended(ringTip, ringPip, ringMcp);
    const pinkyExtended = isFingerExtended(pinkyTip, pinkyPip, pinkyMcp);

    const extendedCount = [thumbExtended, indexExtended, middleExtended, ringExtended, pinkyExtended].filter(Boolean).length;
    const isTwoFingers = indexExtended && middleExtended && !ringExtended && !pinkyExtended;
    const isMostlyClosed = extendedCount <= 1;
    const isFist = isMostlyClosed && !thumbExtended;
    const isOpenPalm = extendedCount >= 4;

    if (isOpenPalm && wrist.x <= 0.55) {
      return "bye-bye";
    }
    if (isOpenPalm && wrist.x > 0.55) {
      return "hello";
    }
    if (isTwoFingers) {
      return "thank you";
    }
    if (isFist) {
      return "sorry";
    }

    return "unknown gesture";
  };

  const detectGesture = async () => {
    if (!handsRef.current || !videoRef.current) return;
    setDetecting(true);
    setPrediction("Detecting...");
    try {
      await handsRef.current.send({ image: videoRef.current });
    } catch (e) {
      console.error(e);
      setPrediction("Detection failed");
      setError(e);
    }
    setDetecting(false);
  };

  const onVideoReady = (video) => {
    videoRef.current = video;
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const gesture = classifyGesture(results.multiHandLandmarks[0]);
        if (gesture !== "unknown gesture") {
          setPrediction(gesture);
          speak(gesture);
          setHistory((prev) => [
            { id: crypto.randomUUID(), value: gesture, time: new Date().toISOString() },
            ...prev.slice(0, 9),
          ]);
        } else {
          setPrediction("Gesture not recognized");
        }
      } else {
        setPrediction("No hand detected");
      }
      setDetecting(false);
    });
    handsRef.current = hands;
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://sign-language-backend-o5ml.onrender.com/speech-to-sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();
      setPrediction(data.sign);
      setRecognizedText(data.recognized_text);
      speak(data.sign);
      setHistory((prev) => [
        { id: crypto.randomUUID(), value: data.sign, time: new Date().toISOString() },
        ...prev.slice(0, 9),
      ]);
    } catch (err) {
      setError('Failed to connect to backend');
    }
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser');
      return;
    }
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setRecognizedText(transcript);
    };

    recognition.onerror = (event) => {
      setError('Speech recognition error: ' + event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <section className="page__section">
      <h1>Detect sign language</h1>
      <p>
        Enable your camera, make the gesture in front of the lens, and press
        "Detect Gesture" to recognize it.
      </p>
      <p>
        Supported gestures: hello, bye-bye, thank you, sorry.
      </p>

      <div className="layout">
        <div className="layout__column">
          <div className="panel">
            <div className="panel__header">
              <h2>Camera Preview</h2>
              <button
                className="button"
                onClick={() => {
                  setCameraOn((prev) => !prev);
                  setPrediction("");
                  setHistory([]);
                }}
              >
                {cameraOn ? "Stop camera" : "Start camera"}
              </button>
            </div>
            <CameraFeed enabled={cameraOn} onError={setError} onVideoReady={onVideoReady} />
            {error && <p className="error">{String(error)}</p>}
          </div>
        </div>

        <div className="layout__column">
          <div className="panel">
            <div className="panel__header">
              <h2>Prediction</h2>
              <div className="panel__controls">
                <button
                  className={`button ${voiceEnabled ? 'button--active' : ''}`}
                  onClick={() => setVoiceEnabled((prev) => !prev)}
                >
                  {voiceEnabled ? 'Voice on' : 'Voice off'}
                </button>
                <button
                  className="button"
                  disabled={!cameraOn || detecting}
                  onClick={detectGesture}
                >
                  {detecting ? "Detecting..." : "Detect Gesture"}
                </button>
              </div>
            </div>

            <OutputBox label="Detected sign" value={prediction} />

            {recognizedText && <p className="recognized-text">Recognized text: "{recognizedText}"</p>}

            <div className="speech-input">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text or use voice"
                className="input"
              />
              <button className="button" onClick={startRecording} disabled={isRecording}>
                {isRecording ? 'Recording...' : '🎤 Record'}
              </button>
              <button className="button" onClick={handleSubmit}>Convert to Sign</button>
            </div>

            {history.length > 0 && (
              <div className="history">
                <h3>Recent results</h3>
                <ul className="history__list">
                  {history.map((item) => (
                    <li key={item.id} className="history__item">
                      <span className="history__label">{item.value}</span>
                      <span className="history__time">
                        {new Date(item.time).toLocaleTimeString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
