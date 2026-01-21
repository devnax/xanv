import XVType from "../XVType"
import XVDefault from "./XVDefault"
import XVTransform from "./XVTransform"

class XVNullable<T> extends XVType<T | null> {
   readonly _type!: T | null
   constructor(private inner: XVType<T>) { super() }

   parse(input: unknown) {
      if (input === null) return null
      return this.inner.parse(input)
   }

   default(value: T | null | (() => T | null)) { return new XVDefault(this, value) }
   transform<U>(fn: (v: T | null) => U) { return new XVTransform(this, fn) }
}


export default XVNullable