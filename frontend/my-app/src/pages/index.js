// Your client-side code (IndexPage.js)
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const IndexPage = () => {
  const [iframeSize, setIframeSize] = useState({ width: 800, height: 600 });
  const socket = io(publicRuntimeConfig.serverBaseUrl); // Define socket here

  useEffect(() => {
    socket.on('resizeIframe', (size) => {
      setIframeSize(size);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleResize = (width, height) => {
    const newSize = { width, height };
    setIframeSize(newSize);
    socket.emit('resizeIframe', newSize); // Emit the resize event using the defined socket
  };

  return (
    <div>
      <h1>Welcome to Your Zoom Class</h1>
      <button onClick={() => handleResize(800, 600)}>Set Default Size</button>
      <button onClick={() => handleResize(400, 300)}>Set Custom Size</button>
      <iframe
        src= {process.env.ZOOM_URI}
        width={iframeSize.width}
        height={iframeSize.height}
        allow="microphone; camera"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default IndexPage;
