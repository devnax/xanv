# `youid`

`youid` is a lightweight JavaScript function that generates unique identifiers (UIDs) from strings. It can also generate random UIDs if no string input is provided. `youid` is flexible, allowing you to specify the length of the UID.

## Installation

To install `youid` as an npm package:

```bash
npm install youid
```

## Usage

`youid` provides a simple API to generate UIDs from strings or create random UIDs. The function takes two optional parameters:

- `str` (optional): The input string from which the UID will be generated.
- `length` (optional): The desired length of the UID.

### Importing the Function

If using a module bundler:

```javascript
import youid from 'youid';
```

### Generating a UID

#### 1. UID from a String
To generate a UID based on a string:

```javascript
const uid = youid('HelloWorld');
console.log(uid); // Example output: "j1m3q4v9"
```

#### 2. Specifying the Length
You can control the length of the generated UID:

```javascript
const uid = youid('HelloWorld', 10);
console.log(uid); // Example output: "j1m3q4v900"
```

#### 3. Generating a Random UID
If no string is provided, `youid` generates a random UID:

```javascript
const randomUID = youid();
console.log(randomUID); // Example output: "x5y7z1w8a2"
```

### Function Signature
```javascript
const youid = (str?: string, length?: number) => string;
```

### Parameters
1. **`str`** *(optional)*: A string input to generate a hash-based UID.
   - If omitted, a random UID generator function is returned.

2. **`length`** *(optional)*: The desired length of the UID.
   - Defaults to the full length of the generated hash or random string.

### Return Value
- **If `str` is provided**: A string UID based on the input string.
- **If `str` is omitted**: A function that generates random UIDs, optionally constrained by `length`.

## Examples

### Basic Examples
#### Hash-Based UID:
```javascript
const uid = youid('MyString');
console.log(uid); // Example output: "k9l2m5"
```

#### Length-Controlled UID:
```javascript
const uid = youid('AnotherString', 12);
console.log(uid); // Example output: "k9l2m5n0pqr8"
```

#### Random UID:
```javascript
const randomUID = youid(null, 8);
console.log(randomUID); // Example output: "abc123xy"
```

### Real-World Usage
#### Generating IDs for HTML Elements:
```javascript
const elementID = youid('button-submit', 10);
document.getElementById('my-element').id = elementID;
console.log(elementID); // Example output: "b8t9w7z6x1"
```

#### Random UIDs for Testing:
```javascript
const randomIDGenerate = youid();
console.log(randomIDGenerate); // Example output: "a9b3c5d7"
```

## How It Works

1. If a string is provided, the function computes a hash using bitwise operations and converts it to a base-36 representation.
2. If `length` is specified, the UID is padded or truncated to match the desired length.
3. If no string is provided, the function returns another function that generates random UIDs using `Math.random()`.

## License

`youid` is open-source software licensed under the [MIT License](LICENSE).

## Contributions

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/devnax/`youid`).

---

For any issues or inquiries, please contact the [maintainer](mailto:edvnaxrul@gmail.com).
