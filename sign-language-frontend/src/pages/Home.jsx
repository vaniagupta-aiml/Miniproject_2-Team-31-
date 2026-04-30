import React from "react";
import heroImage from "../assets/hero.png";

export default function Home() {
  return (
    <section className="home">
      <header className="home__hero" id="home">
        <div className="home__heroText">
          <p className="home__badge">Hand 2 Voice</p>
          <h1>Bring Sign Language to Life</h1>
          <p>
            A modern frontend to capture hand motion, run sign recognition, and
            turn gestures into text. Build on top of it with any ML model you like.
          </p>
          <div className="home__cta">
            <a className="button" href="/detect">
              Try the detector
            </a>
            <a className="button button--ghost" href="/#how-it-works">
              How it works
            </a>
          </div>
        </div>

        <div className="home__heroImage">
          <img src={heroImage} alt="Illustration of hands signing" />
        </div>
      </header>

      <section className="home__section" id="how-it-works">
        <h2>How it works</h2>
        <p>
          The app captures camera video, processes it frame-by-frame, and sends
          the data to a model for sign recognition. It’s built to make adding
          your own detection model easy.
        </p>
        <div className="home__steps">
          <div className="home__step">
            <strong>1. Capture</strong>
            <p>Enable your webcam and stream hand motion in real time.</p>
          </div>
          <div className="home__step">
            <strong>2. Detect</strong>
            <p>Run the model to identify common signs and build a prediction output.</p>
          </div>
          <div className="home__step">
            <strong>3. Share</strong>
            <p>Show results, history, or speak the detected sign to communicate.</p>
          </div>
        </div>
      </section>

      <section className="home__section" id="features">
        <h2>Features</h2>
        <div className="cardGrid">
          <div className="card">
            <h3>Live Camera Preview</h3>
            <p>Instantly see what the app reads from your webcam.</p>
          </div>
          <div className="card">
            <h3>Modular Detection</h3>
            <p>
              Swap any model you like — TensorFlow, MediaPipe, or a custom backend.
            </p>
          </div>
          <div className="card">
            <h3>Result History</h3>
            <p>Keep track of recent detections so you can review what was recognized.</p>
          </div>
          <div className="card">
            <h3>Responsive Layout</h3>
            <p>Looks great on desktop, tablet, and mobile—built with flexibility in mind.</p>
          </div>
        </div>
      </section>

      <section className="home__section" id="demo">
        <h2>Demo</h2>
        <p>
          Click “Try the detector” to open the demo page, allow camera access, and
          begin exploring sign recognition in action.
        </p>
        <a className="button" href="/detect">
          Open demo
        </a>
      </section>

      <section className="home__section" id="team">
        <h2>Team</h2>
        <p>
          Built for learning and experimentation. Customize it to match your own
          project or classroom.
        </p>
        <div className="cardGrid">
          <div className="card">
            <h3>Developer</h3>
            <p>Builds the UI and connects the model.</p>
          </div>
          <div className="card">
            <h3>Designer</h3>
            <p>Creates the interface experience and layout.</p>
          </div>
          <div className="card">
            <h3>Model</h3>
            <p>The brain behind sign recognition (plug in your own).</p>
          </div>
        </div>
      </section>

      <section className="home__section" id="contact">
        <h2>Contact</h2>
        <p>
          Want help building your own sign language app? Email us and we’ll point you
          in the right direction.
        </p>
        <div className="contact">
          <div className="contact__card">
            <h3>Email</h3>
            <p>support@hand2voice.app</p>
          </div>
          <div className="contact__card">
            <h3>GitHub</h3>
            <p>github.com/hand2voice</p>
          </div>
        </div>
      </section>
    </section>
  );
}
