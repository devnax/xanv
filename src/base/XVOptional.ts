import XVType from "../XVType"
import XVDefault from "./XVDefault"
import XVTransform from "./XVTransform"

class XVOptional<T> extends XVType<T | undefined> {
   readonly _type!: T | undefined
   constructor(private inner: XVType<T>) { super() }

   parse(input: unknown) {
      if (input === undefined) return undefined
      return this.inner.parse(input)
   }

   default(value: T | undefined | (() => T | undefined)) {
      return new XVDefault(this, value)
   }
   transform<U>(fn: (v: T | undefined) => U) { return new XVTransform(this, fn) }
}

export default XVOptional