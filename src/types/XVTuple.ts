import XVDefault from "../base/XVDefault"
import XVNullable from "../base/XVNullable"
import XVOptional from "../base/XVOptional"
import XVTransform from "../base/XVTransform"
import { Infer } from "../types"
import XVType from "../XVType"

export default class XVTuple<T extends XVType<any>[]> extends XVType<{ [K in keyof T]: Infer<T[K]> }> {
   readonly _type!: { [K in keyof T]: Infer<T[K]> }

   constructor(private items: [...T]) {
      super()
   }

   parse(input: unknown): { [K in keyof T]: Infer<T[K]> } {
      if (!Array.isArray(input)) throw new Error("Expected tuple")
      if (input.length !== this.items.length) {
         throw new Error(`Expected tuple of length ${this.items.length}`)
      }

      return this.items.map((item, i) => item.parse(input[i])) as { [K in keyof T]: Infer<T[K]> }
   }

   // =======================
   // Optional / Nullable / Default / Transform
   // =======================
   default(value: { [K in keyof T]: Infer<T[K]> } | (() => { [K in keyof T]: Infer<T[K]> })): XVDefault<{ [K in keyof T]: Infer<T[K]> }> {
      return new XVDefault(this, value)
   }

   transform<U>(fn: (v: { [K in keyof T]: Infer<T[K]> }) => U) {
      return new XVTransform(this, fn)
   }

   optional(): XVOptional<{ [K in keyof T]: Infer<T[K]> }> {
      return new XVOptional(this)
   }

   nullable(): XVNullable<{ [K in keyof T]: Infer<T[K]> }> {
      return new XVNullable(this)
   }
}
