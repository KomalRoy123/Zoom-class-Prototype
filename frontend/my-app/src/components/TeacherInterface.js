// components/TeacherInterface.js

import React, { useState } from 'react';
import io from 'socket.io-client';

const TeacherInterface = () => {
  const [socket, setSocket] = useState(io());

  const enlargeScreen = () => {
    // for enlarging the screen
    socket.emit('resizeIframe', { width: 1000, height: 800 });
  };

  const reduceScreen = () => {
    // for reducing the screen
    socket.emit('resizeIframe', { width: 600, height: 400 });
  };

  return (
    <div>
      <button onClick={enlargeScreen}>Enlarge Screen</button>
      <button onClick={reduceScreen}>Reduce Screen</button>
    </div>
  );
};

export default TeacherInterface;
