import XVDefault from "../base/XVDefault"
import XVNullable from "../base/XVNullable"
import XVOptional from "../base/XVOptional"
import XVTransform from "../base/XVTransform"
import { Infer } from "../types"
import XVType from "../XVType"

export default class XVUnion<T extends XVType<any>[]> extends XVType<Infer<T[number]>> {
   readonly _type!: Infer<T[number]>

   constructor(private options: [...T]) {
      super()
   }

   parse(input: unknown): Infer<T[number]> {
      for (const schema of this.options) {
         try {
            return schema.parse(input)
         } catch {
            // ignore errors and try next option
         }
      }
      throw new Error("No union match")
   }

   // =======================
   // Optional / Nullable / Default / Transform
   // =======================
   default(value: Infer<T[number]> | (() => Infer<T[number]>)): XVDefault<Infer<T[number]>> {
      return new XVDefault(this, value)
   }

   transform<U>(fn: (v: Infer<T[number]>) => U) {
      return new XVTransform(this, fn)
   }

   optional(): XVOptional<Infer<T[number]>> {
      return new XVOptional(this)
   }

   nullable(): XVNullable<Infer<T[number]>> {
      return new XVNullable(this)
   }
}
