import { XanvType } from ".."
import XVTransform from "./XVTransform"

class XVDefault<T> extends XanvType<T> {
   readonly _type!: T
   constructor(private inner: XanvType<T>, private defaultValue: T | (() => T)) {
      super()
   }

   parse(input: unknown): T {
      if (input === undefined) {
         // call function if defaultValue is a function
         return typeof this.defaultValue === "function"
            ? (this.defaultValue as () => T)()
            : this.defaultValue
      }
      return this.inner.parse(input)
   }

   default(value: T | (() => T)) {
      return new XVDefault(this, value)
   }

   transform<U>(fn: (v: T) => U) {
      return new XVTransform(this, fn)
   }
}


export default XVDefault