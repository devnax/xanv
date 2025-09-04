import React from 'react';
import { createRoot } from 'react-dom/client';
import { xv } from './src';


const arr = xv.array(xv.object({
  id: xv.string(),
  name: xv.string(),
  age: xv.number(),
}))

const age = xv.map(xv.string(), xv.number());
console.log(age.parse(new Map([['a', 1], ['b', 1]])));

const App = () => {
  return (
    <div style={{ fontFamily: 'monospace,math, sans-serif', textAlign: 'center', marginTop: '50px' }}>

    </div>
  );
}
const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}