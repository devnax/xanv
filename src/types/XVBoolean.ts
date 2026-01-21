import XVType from "../XVType"

export default class XVBoolean extends XVType<boolean> {
   private transformers: ((v: boolean) => boolean)[] = []

   parse(input: unknown): boolean {
      if (typeof input !== "boolean") {
         throw new Error("Expected boolean")
      }

      let val = input

      // Apply transformers
      for (const fn of this.transformers) val = fn(val)

      return val
   }

   // =======================
   // Transformers
   // =======================
   not(): this {
      this.transformers.push(v => !v)
      return this
   }

   toggle(): this {
      this.transformers.push(v => !v)
      return this
   }
}