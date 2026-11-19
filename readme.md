# Xanv

[Documentation](https://xanv.devnax.com)

Xanv is a small TypeScript-first runtime validation library. Schemas validate
values at runtime while exposing their inferred TypeScript types.

## Features

- Runtime validation for primitive, collection, object, function, promise, file,
  and React function-component values
- Composable optional, nullable, default, and transform behavior
- Type inference with `Infer` and `InferValue`
- No runtime dependencies
- Named validator classes are exported for extension and direct use

## Installation

```bash
npm install xanv
```

## Quick start

```ts
import { InferValue, xv } from "xanv";

const userSchema = xv.object({
  id: xv.string().min(1),
  email: xv.string().email(),
  age: xv.number().integer().min(0),
  roles: xv.array(xv.enum(["admin", "member"])),
  nickname: xv.string().optional(),
});

type User = InferValue<typeof userSchema>;

const user = userSchema.parse({
  id: "usr_123",
  email: "hello@example.com",
  age: 28,
  roles: ["member"],
});
```

`parse` returns the parsed value. It throws an `Error` when validation fails.
Nested objects, arrays, tuples, records, maps, sets, and unions validate their
contents recursively.

## Inference

Xanv exports two inference utilities:

```ts
import { Infer, InferValue, xv } from "xanv";

const shape = {
  name: xv.string(),
  enabled: xv.boolean().default(true),
  note: xv.string().nullable(),
};

type Input = Infer<typeof shape>;
// { name: string; note: string | null; enabled?: boolean }

type Output = InferValue<typeof shape>;
// { name: string; note: string | null; enabled: boolean }
```

- `Infer` treats fields with `.optional()` or `.default()` as optional. Use it
  for values that may be supplied to a schema.
- `InferValue` only treats `.optional()` fields as optional. Use it for values
  after parsing, including fields populated by defaults.
- `.nullable()` adds `null` to a schema's inferred value type.

`Infer` and `InferValue` accept either a schema object or an `XVType` validator.

## Common methods

Every validator extends `XVType<T>` and provides:

```ts
schema.parse(value);
schema.optional();
schema.nullable();
schema.default(fallback);
schema.transform(value => newValue);
schema.clone();
schema.getDefault();
```

Defaults may be a value or a zero-argument function:

```ts
const createdAt = xv.date().default(() => new Date());
const normalized = xv.string()
  .min(1)
  .transform(value => value.trim());
```

Validation checks run before transforms. A transform receives and returns the
validator's parsed value type.

## Validators

| Factory | Validates | Constraint methods |
| --- | --- | --- |
| `xv.any<T>()` | Any value (default type: `any`) | Common methods |
| `xv.string(length?)` | String | `length`, `min`, `max`, `email`, `uppercase`, `lowercase`, `number`, `date`, `base64` |
| `xv.number(length?)` | Number | `length`, `min`, `max`, `positive`, `negative`, `integer`, `float` |
| `xv.boolean()` | Boolean | Common methods |
| `xv.date()` | Valid `Date` instance | Common methods |
| `xv.enum(values)` | A value from an array or object | Common methods |
| `xv.file()` | Browser `File` or file-like object | `size`, `minsize`, `maxsize`, `type`, `extension` |
| `xv.array(item)` | Array whose items match `item` | `min`, `max`, `unique` |
| `xv.object(shape)` | Object matching a validator shape | Common methods |
| `xv.record(key, value)` | Object with validated keys and values | Common methods |
| `xv.map(key, value)` | `Map` with validated entries | Common methods |
| `xv.set(item)` | `Set` with validated items | `min`, `max` |
| `xv.tuple(items)` | Fixed-length tuple | Common methods |
| `xv.union(items)` | Value accepted by at least one item schema | Common methods |
| `xv.function(options)` | Function wrapper with validated arguments and return value | Common methods |
| `xv.promise(item)` | Promise whose resolved value matches `item` | Common methods |
| `xv.functionComponent(props, async?)` | Function-component wrapper with validated props | Common methods |

### Objects

```ts
const person = xv.object({
  name: xv.string().min(1),
  age: xv.number().integer().min(0),
});

const parsed = person.parse({ name: "Ada", age: 36 });
```

Object parsing returns the fields declared by the schema. Every shape field is
parsed independently, so its default, nullable, optional, and nested validators
are applied.

### Collections

```ts
const tags = xv.array(xv.string()).min(1).max(5).unique();
const pair = xv.tuple([xv.string(), xv.number()]);
const scores = xv.record(xv.enum(["math", "science"]), xv.number().min(0));
const lookup = xv.map(xv.string(), xv.number());
const selection = xv.set(xv.number()).min(1);
```

### Unions and enums

```ts
const identifier = xv.union([xv.string().min(1), xv.number().integer()]);
const role = xv.enum(["admin", "member"] as const);

enum Status {
  Active = "active",
  Disabled = "disabled",
}

const status = xv.enum(Status);
```

### Functions

`xv.function` wraps a function and validates its arguments and return value each
time the wrapper is called.

```ts
const calculate = xv.function({
  args: [xv.number(), xv.number()],
  returns: xv.number(),
});

const add = calculate.parse((left, right) => left + right)!;
add(2, 3); // 5
```

For a function that returns a promise, pass `async: true`:

```ts
const fetchName = xv.function({
  args: [xv.number().integer()],
  returns: xv.string(),
  async: true,
});

const loadName = fetchName.parse(async id => `user-${id}`);
```

If a function is marked async, Xanv checks that the original function returned a
promise and validates the resolved return value.

### React function components

The second argument marks a function component as async:

```tsx
import { xv } from "xanv";

const buttonSchema = xv.functionComponent({
  label: xv.string().min(1),
  count: xv.number().integer(),
});

const Button = buttonSchema.parse(props => (
  <button>
    {props.label}: {props.count}
  </button>
))!;
```

```tsx
const asyncButtonSchema = xv.functionComponent(
  { label: xv.string() },
  true,
);

const AsyncButton = asyncButtonSchema.parse(async props => (
  <div>{props.label}</div>
))!;
```

### Promises and files

```ts
const responseSchema = xv.promise(
  xv.object({
    ok: xv.boolean(),
  }),
);

const response = await responseSchema.parse(Promise.resolve({ ok: true }));

const image = xv.file()
  .maxsize(5 * 1024 * 1024)
  .type(["image/png", "image/jpeg"])
  .extension(["png", "jpg", "jpeg"]);
```

`xv.file()` accepts `File` instances in browser environments and file-like
objects containing `name`, `size`, and `type`.

## Extending Xanv

Subclass `XVType<T>` and implement `check` to create a custom validator:

```ts
import { XVType } from "xanv";

class EvenNumber extends XVType<number> {
  protected check(value: unknown): number {
    if (typeof value !== "number" || !Number.isInteger(value) || value % 2 !== 0) {
      throw new Error("Value must be an even integer");
    }
    return value;
  }
}

const even = new EvenNumber();
even.parse(4);
```

Register additional constraints with the protected `set` helper from a subclass.
Validator classes exported by Xanv can also be instantiated directly.

## Development

```bash
npm install
npx tsc --noEmit
npm run build
```

The project uses `makepack` for build and release tasks. The package currently
does not define an automated test script.

## Repository

Documentation: [xanv.devnax.com](https://xanv.devnax.com)

Source and issue tracking: [github.com/devnax/xanv](https://github.com/devnax/xanv)
