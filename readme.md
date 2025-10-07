# Xanv — Lightweight Runtime Validation with TypeScript Inference

[![npm version](https://img.shields.io/badge/npm-v0.0.0-blue.svg)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

**Xanv** is a minimal runtime validation library that pairs elegantly with TypeScript. It provides a fluent API for building runtime-safe schemas that retain full static typing at compile time. With generic class-based validators, you get the best of both worlds — reliable runtime checks and precise type inference.

---

## Table of Contents

* Features
* Installation
* Quick Start
* Type Inference & TypeScript Integration
* API Reference
* Advanced Examples
* Migration Notes
* Development & Testing
* Contributing
* Changelog
* License

---

## Features

* 🚀 **Lightweight & dependency-free** — zero external dependencies.
* 🔗 **Fluent API** — chainable constraints and transformations.
* 🧩 **Generic XV classes** — `XVArray<T>`, `XVObject<S>`, `XVMap<K, V>`, and more, for perfect type inference.
* 🧠 **Type inference helper** — `xv.infer<T>` extracts TypeScript types directly from schema definitions.

---

## Installation

```bash
npm install xanv
# or
yarn add xanv
```

---

## Quick Start

Validate and parse data with type safety:

```ts
import { xv } from 'xanv';

const schema = xv.object({
  id: xv.string().min(3),
  age: xv.number().min(0),
  tags: xv.array(xv.string()),
});

const parsed = schema.parse({ id: 'abc', age: 30, tags: ['x'] });
console.log(parsed.id);
```

The `parse()` method returns a validated value or throws on failure.
Control missing or nullable values with `.optional()`, `.nullable()`, and `.default()`.

---

## Type Inference & TypeScript Integration

Because each factory returns a **generic class instance**, Xanv retains full type information across schema definitions.

```ts
import { xv } from 'xanv';

const schema = {
  id: xv.string(),
  age: xv.number(),
  tags: xv.array(xv.string()),
} as const;

type SchemaT = xv.infer<typeof schema>;
// { id: string; age: number; tags: string[] }

const obj = xv.object(schema);
type ObjT = xv.infer<typeof schema>; // same as SchemaT

const maybe: ObjT | undefined | null = obj.parse({ id: 'a', age: 1, tags: ['x'] });
```

### How Inference Works

* Each `XV` class is generic, e.g. `XVObject<S>`, `XVArray<T>`, `XVRecord<K, V>`, `XVTuple<Ts>`.
* The `xv.infer<typeof schema>` utility traverses schema literals and extracts TypeScript equivalents.

---

## API Reference

Each top-level factory method on the `xv` export returns a typed validator class.

| Method                    | Returns              | Description                  |
| ------------------------- | -------------------- | ---------------------------- |
| `xv.string(length?)`      | `XVString<string>`   | String validator             |
| `xv.number()`             | `XVNumber<number>`   | Number validator             |
| `xv.boolean()`            | `XVBoolean<boolean>` | Boolean validator            |
| `xv.date()`               | `XVDate<Date>`       | Date validator               |
| `xv.array(type, length?)` | `XVArray<T>`         | Array of a specific type     |
| `xv.tuple(types)`         | `XVTuple<T>`         | Tuple with precise types     |
| `xv.union(types)`         | `XVUnion<T>`         | Union of multiple validators |
| `xv.object(schema?)`      | `XVObject<S>`        | Object validator             |
| `xv.map(key, value)`      | `XVMap<K, V>`        | Map validator                |
| `xv.set(type)`            | `XVSet<T>`           | Set validator                |
| `xv.record(key, value)`   | `XVRecord<K, V>`     | Record validator             |
| `xv.enum(values)`         | `XVEnum<T>`          | Enum validator               |

### Common Instance Methods

* `parse(value: any): T | undefined | null`
* `optional(): this`
* `nullable(): this`
* `default(value: T | (() => T)): this`
* `transform(cb: (value: T) => T): this`

Additional constraint methods are available in `src/types` (e.g., `.min`, `.max`, `.email`, `.unique`, `.float`, `.integer`, etc.).

---

## Advanced Examples

### Tuple with Exact Types

```ts
const tpl = xv.tuple([xv.string(), xv.number()]);
type Tpl = xv.infer<typeof ({ a: tpl })['a']>;
// [string, number]
```

### Nested Objects and Arrays

```ts
const user = xv.object({ name: xv.string(), id: xv.number() });
const schema = xv.object({ users: xv.array(user) });

type SchemaT = xv.infer<typeof schema['arg']>;
// { users: { name: string; id: number }[] }
```

### Validation with Transform and Default

```ts
const s = xv.string().transform(v => v.trim()).default('n/a');
const parsed = s.parse(undefined); // "n/a"
```

---

## Migration Notes

If you’re upgrading from a pre-generic version of Xanv:

* Factories now return **generic class types** — remove legacy wrappers.
* Use `as const` on schema literals for optimal `xv.infer` inference.

---

## Development & Testing

Run TypeScript checks and tests:

```bash
npx tsc --noEmit
npm test
```

### Adding New Types

1. Create a new generic class under `src/types`.
2. Add its factory signature in `src/index.ts`.
3. Write unit tests and update documentation examples.

---

## Contributing

* Open issues before large changes.
* Keep PRs focused and include relevant tests.
* Update public type definitions and README when altering APIs.

---

## Changelog

Refer to `CHANGELOG.md` for updates.
Include short migration notes for any breaking changes.

---

## License

MIT © 2025
