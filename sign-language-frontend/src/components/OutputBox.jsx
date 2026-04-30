import React from "react";

export default function OutputBox({ label, value }) {
  return (
    <section className="output">
      <div className="output__header">
        <h2>{label}</h2>
      </div>
      <div className="output__body">
        <p>{value ?? "No result yet. Try the detector."}</p>
      </div>
    </section>
  );
}
