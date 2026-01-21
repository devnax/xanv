import XVType from "../XVType"

export default class XVNumber extends XVType<number> {

   private transformers: ((v: number) => number)[] = []

   parse(input: unknown): number {
      if (typeof input !== "number") throw new Error("Expected number")
      let val = input

      // Apply transformers
      for (const fn of this.transformers) val = fn(val)

      // Apply checks
      for (const check of this.checks) check(val)

      return val
   }

   // =======================
   // Validators
   // =======================
   min(minValue: number, message?: string) {
      this.checks.push(v => {
         if (v < minValue) throw new Error(message || `Number must be >= ${minValue}`)
      })
      return this
   }

   max(maxValue: number, message?: string) {
      this.checks.push(v => {
         if (v > maxValue) throw new Error(message || `Number must be <= ${maxValue}`)
      })
      return this
   }

   gt(gtValue: number, message?: string) {
      this.checks.push(v => {
         if (v <= gtValue) throw new Error(message || `Number must be > ${gtValue}`)
      })
      return this
   }

   gte(gteValue: number, message?: string) {
      this.checks.push(v => {
         if (v < gteValue) throw new Error(message || `Number must be >= ${gteValue}`)
      })
      return this
   }

   lt(ltValue: number, message?: string) {
      this.checks.push(v => {
         if (v >= ltValue) throw new Error(message || `Number must be < ${ltValue}`)
      })
      return this
   }

   lte(lteValue: number, message?: string) {
      this.checks.push(v => {
         if (v > lteValue) throw new Error(message || `Number must be <= ${lteValue}`)
      })
      return this
   }

   int(message?: string) {
      this.checks.push(v => {
         if (!Number.isInteger(v)) throw new Error(message || "Number must be an integer")
      })
      return this
   }

   positive(message?: string) {
      this.checks.push(v => {
         if (v <= 0) throw new Error(message || "Number must be positive")
      })
      return this
   }

   negative(message?: string) {
      this.checks.push(v => {
         if (v >= 0) throw new Error(message || "Number must be negative")
      })
      return this
   }

   multipleOf(factor: number, message?: string) {
      this.checks.push(v => {
         if (v % factor !== 0) throw new Error(message || `Number must be multiple of ${factor}`)
      })
      return this
   }

   finite(message?: string) {
      this.checks.push(v => {
         if (!Number.isFinite(v)) throw new Error(message || "Number must be finite")
      })
      return this
   }

   // =======================
   // Transformers
   // =======================
   round() {
      this.transformers.push(v => Math.round(v))
      return this
   }

   floor() {
      this.transformers.push(v => Math.floor(v))
      return this
   }

   ceil() {
      this.transformers.push(v => Math.ceil(v))
      return this
   }

   // Optional / Nullable / Default / Transform inherited from XVType
}
