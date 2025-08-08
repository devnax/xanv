import React from 'react';
import { createRoot } from 'react-dom/client';
import { xv } from './src';


const arr = xv.array(xv.object({
  id: xv.string(),
  name: xv.string(),
  age: xv.number(),
}))
console.log(arr.parse([{
  id: '1',
  name: 'John',
  age: 30,
}]))


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