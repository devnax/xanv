import React from 'react';
import { createRoot } from 'react-dom/client';
import './src/index.ts';

const App = () => {
  return (
    <div style={{ fontFamily: 'monospace,math, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to makepack CLI!</h1>
      <button
        onClick={() => {
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