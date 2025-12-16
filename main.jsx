import React from 'react';
import { createRoot } from 'react-dom/client';
import { xv } from './src';


const arr = xv.object({
  id: xv.string(),
  name: xv.string(),
  age: xv.number(),
})

const age = xv.boolean().default(false)
let clone = age.clone().nullable()

const record = xv.record(xv.string(), xv.string())


let p = age.parse(undefined)
// console.log(age.parse(true));

const App = () => {
  return (
    <div style={{ fontFamily: 'monospace,math, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      aasd
    </div>
  );
}
const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}