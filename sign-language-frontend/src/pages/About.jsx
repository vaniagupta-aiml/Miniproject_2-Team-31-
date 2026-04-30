import React from "react";

export default function About() {
  return (
    <section className="page__section">
      <h1>About this demo</h1>
      <p>
        This front-end is built using React + Vite. The Detect page includes a
        lightweight camera preview and a placeholder output component so you can
        integrate any machine learning or sign language prediction model later.
      </p>
      <div className="card">
        <h2>Next steps</h2>
        <ul>
          <li>Connect a real sign language model (TensorFlow.js, MediaPipe, etc).</li>
          <li>Send predictions to a backend or save a history.</li>
          <li>Add accessibility support (keyboard navigation, ARIA labels).</li>
        </ul>
      </div>
    </section>
  );
}
