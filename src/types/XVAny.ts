import XVTransform from "../base/XVTransform"
import XVType from "../XVType"

export default class XVAny extends XVType<unknown> {
   readonly _type!: unknown

   parse(input: unknown): unknown {
      let val: unknown = input

      return val
   }

   // =======================
   // Transformers
   // =======================
   transform<U>(fn: (v: unknown) => U) {
      return new XVTransform(this, fn);
   }

   // default / optional / nullable inherited from XVType
}
