import React from "react";

export default function Loader({ size = "md", fullPage = false }) {
  if (fullPage) {
    return (
      <div className="loader-container" style={{ minHeight: "100vh" }}>
        <div className={`loader loader-${size}`}></div>
      </div>
    );
  }

  return <div className={`loader loader-${size}`}></div>;
}
