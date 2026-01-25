import React from 'react';
import { createRoot } from 'react-dom/client';
import { xv, Infer } from './src';

const ob = {
  any: xv.any(),
  array: xv.array(xv.string()).optional(),           // array of strings
  boolean: xv.boolean(),
  date: xv.date(),
  enum: xv.enum(["active", 1]),    // enum with string values
  file: xv.file(),
  number: xv.number(),
  object: xv.object({ name: xv.string(), person: xv.object({ age: xv.number() }) }),
  record: xv.record(xv.string(), xv.number()),
  map: xv.map(xv.string(), xv.number()),
  set: xv.set(xv.number()),
  string: xv.string(),
  tuple: xv.tuple([xv.string(), xv.number()]),
  union: xv.union([xv.string(), xv.number()]),
  func: xv.function([xv.string()], xv.boolean()),
  promise: xv.promise(xv.any())
}

const schema = xv.object(ob);

const schema1 = xv.object({
  func: xv.function([xv.string(), xv.number()], xv.any()),
});

const o = xv.object({
  array: xv.array(xv.string()).optional(),           // array of strings
  name: xv.string(),
})
type T = Infer<typeof o>

type SchemaType = Infer<typeof schema>;



// Example usage
const data: SchemaType = {
  any: 123,
  array: ["hello", "world"],
  boolean: true,
  date: new Date(),
  enum: "active",
  file: new File([], "test.txt"),
  number: 42,
  object: {
    name: "John",
    person: {
      age: 20
    }
  },
  record: { key1: 1, key2: 2 },
  map: new Map([["a", 1], ["b", 2]]),
  set: new Set([1, 2, 3]),
  string: "hello",
  tuple: ["abc", 123],
  union: "string or number",
  func: (a: string) => true,
  promise: Promise.resolve(42),
};

// Parsing / validation
const parsed = schema.parse(data);
console.log(parsed);


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