import React from "react";

const EmbeddedVideoFrame = ({ embedId }) => {
  return (
    <iframe
      src={embedId}
      allowFullScreen
      className="iframe"
      allow="autoplay"
      title="example"
    />
  );
};

export default EmbeddedVideoFrame;
