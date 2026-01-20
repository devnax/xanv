import React from 'react';
import { createRoot } from 'react-dom/client';
import { xv, Infer, XVString, XVFunction } from './src';

const ob = {
  any: xv.any(),
  array: xv.array(xv.string()),           // array of strings
  boolean: xv.boolean(),
  date: xv.date(),
  enum: xv.enum("active", "inactive"),    // enum with string values
  file: xv.file(),
  number: xv.number(),
  object: xv.object({ name: xv.string(), person: xv.object({ age: xv.number() }) }),
  record: xv.record(xv.string(), xv.number()),
  map: xv.map(xv.string(), xv.number()),
  set: xv.set(xv.number()),
  string: xv.string(),
  tuple: xv.tuple([xv.string(), xv.number()]),
  union: xv.union([xv.string(), xv.number()]),
  json: xv.json()
}

const strv = new XVString()

const schema = xv.object({
  any: xv.any(),
  array: xv.array(xv.string()).optional(),           // array of strings
  boolean: xv.boolean(),
  date: xv.date(),
  enum: xv.enum("active", "inactive"),    // enum with string values
  file: xv.file(),
  number: xv.number(),
  object: xv.object({ name: xv.string(), person: xv.object({ age: xv.number() }) }),
  record: xv.record(xv.string(), xv.number()),
  map: xv.map(xv.string(), xv.number()),
  set: xv.set(xv.number()),
  string: xv.string(),
  tuple: xv.tuple([xv.string(), xv.number()]),
  union: xv.union([xv.string(), xv.number()]),
  json: xv.json(),
  func: xv.function([xv.string(), xv.number()] as const, xv.promise(xv.number())),
  promise: xv.promise(xv.number())
});


let ar = xv.array(xv.string())
type AR = Infer<typeof ar>
// TypeScript will infer this type:
type SchemaType = Infer<typeof schema>;

/*
SchemaType will be equivalent to:

{
  any: any;
  array: string[];
  boolean: boolean;
  date: Date;
  enum: "active" | "inactive";
  file: File | Blob;
  number: number;
  object: { name: string };
  record: Record<string, number>;
  map: Map<string, number>;
  set: Set<number>;
  string: string;
  tuple: [string, number];
  union: string | number;
  json: Record<string, any>;
}
*/

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
  json: {},
  func: async (a: string, b: number) => 1,
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