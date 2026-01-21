import XVDefault from "./base/XVDefault"
import XVNullable from "./base/XVNullable"
import XVOptional from "./base/XVOptional"
import XVTransform from "./base/XVTransform"

export default abstract class XVType<T> {
   readonly _type!: T
   protected checks: ((v: T) => void)[] = []
   abstract parse(input: unknown): T

   default(value: T | (() => T)) {
      return new XVDefault<T>(this, value)
   }

   transform<U>(fn: (v: T) => U) {
      return new XVTransform<T, U>(this, fn)
   }

   optional() {
      return new XVOptional<T>(this)
   }

   nullable() {
      return new XVNullable<T>(this)
   }
}