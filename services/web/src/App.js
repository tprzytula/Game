import React from 'react';

function App() {
  const socket = new WebSocket('ws://localhost:7150');

  socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
  });

  socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
  });

  return (
    <div>
        Game App
    </div>
  );
}

export default App;
