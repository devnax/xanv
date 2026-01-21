import XVDefault from "../base/XVDefault"
import XVNullable from "../base/XVNullable"
import XVOptional from "../base/XVOptional"
import XVTransform from "../base/XVTransform"
import { Infer } from "../types"
import XVType from "../XVType"
type Shape = Record<string, XVType<any>>

export default class XVObject<T extends Shape> extends XVType<{ [K in keyof T]: Infer<T[K]> }> {

   constructor(public shape: T) {
      super()
   }

   parse(input: unknown) {
      if (typeof input !== "object" || input === null) {
         throw new Error("Expected object")
      }

      const out: any = {}
      for (const key in this.shape) {
         const schema = this.shape[key]
         const value = (input as any)[key]
         out[key] = schema.parse(value)
      }

      return out
   }

   // =======================
   // Correctly typed overrides
   // =======================
   default(value: { [K in keyof T]: Infer<T[K]> } | (() => { [K in keyof T]: Infer<T[K]> })) {
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



// const s = new XVObject({
//    name: new XVString(),
//    info: new XVObject({
//       email: new XVString(),
//       info: new XVObject({
//          email: new XVString()
//       })
//    })
// })

// type T = Infer<typeof s>