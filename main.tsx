import React from "react";
import { createRoot } from "react-dom/client";
import { xv, Infer, XVType, XVArray, XVString } from "./src";

class XVNewType<T extends string, C extends string> extends XVType<{
  t: T;
  c: C;
}> {
  readonly table: T;
  readonly column: C;
  dynamic = false;

  relation = {
    main: "",
    target: "",
  };

  constructor(table: T, column: C) {
    super();
    this.table = table;
    this.column = column;
  }

  protected check(value: any) {
    return value;
  }
}

const ob = {
  any: xv.any(),
  array: xv.array(xv.string()).optional(), // array of strings
  boolean: xv.boolean(),
  date: xv.date(),
  enum: xv.enum(["active", 1]), // enum with string values
  file: xv.file(),
  number: xv.number(),
  object: xv.object({
    name: xv.string(),
    person: xv.object({ age: xv.number() }),
  }),
  record: xv.record(xv.enum(["a", "b"]), xv.number()),
  map: xv.map(xv.string(), xv.number()),
  set: xv.set(xv.number()),
  string: xv.string(),
  tuple: xv.tuple([xv.string(), xv.number()]),
  union: xv.union([xv.string(), xv.number()]),
  func: xv.function({
    args: [xv.string()],
    returns: xv.string(),
  }),
  promise: xv.promise(xv.any()),
};

type SchemaType = Infer<typeof schema>;

const schema = xv.object(ob);
const clone = schema.clone();

const n = xv.number().float();
n.parse(3);

const a = xv.array(xv.string()).nullable();
const t = new XVArray(new XVString());
const s = new XVNewType("t", "c");
type T = Infer<typeof a>;

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
      age: 20,
    },
  },
  record: { a: 1 },
  map: new Map([
    ["a", 1],
    ["b", 2],
  ]),
  set: new Set([1, 2, 3]),
  string: "hello",
  tuple: ["abc", 123],
  union: "string or number",
  func: (a: string) => a,
  promise: Promise.resolve(42),
};

// Parsing / validation
const parsed = schema.parse(data);
console.log(parsed);
parsed?.func("asdasd");

const ButtonSchema = xv.functionComponent({
  label: xv.string(),
  count: xv.number(),
});

const AsyncButtonSchema = xv.functionComponent(
  {
    label: xv.string(),
  },
  true,
);

const AsyncButton = AsyncButtonSchema.parse(async (props: any) => {
  const data = await fetch("/api").then((r) => r.json());

  return (
    <div>
      {props.label}: {data.value}
    </div>
  );
});

const Button = ButtonSchema.parse((props: any) => {
  return (
    <button>
      {props.label} - {props.count}
    </button>
  );
});

const App = () => {
  return (
    <div
      style={{
        fontFamily: "monospace,math, sans-serif",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <Button label="asd" count={1} />
    </div>
  );
};
const rootEle = document.getElementById("root");
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}
