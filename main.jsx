import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import youid from './src/index.ts';

const App = () => {
  const [id, setId] = useState(youid(null, 10));
  return (
    <div style={{ fontFamily: 'monospace,math, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to makepack CLI!</h1>
      <p>uid: {id}</p>
      <button
        onClick={() => {
          setId(youid(null, 10));
        }}
      >generate</button>
    </div>
  );
}
const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}