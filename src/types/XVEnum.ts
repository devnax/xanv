import XVType from "../XVType"

export default class XVEnum<T extends string | number> extends XVType<T> {
   readonly _type!: T

   constructor(private options: T[]) {
      super()
   }

   parse(input: unknown): T {
      if (!this.options.includes(input as T)) {
         throw new Error(`Expected one of: ${this.options.join(", ")}`)
      }
      return input as T
   }

   // =======================
   // Optional / Nullable / Default / Transform inherited from XVType
   // =======================
}
