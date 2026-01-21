
import XVType from "../XVType"

class XVString extends XVType<string> {
   private transformers: ((v: string) => string)[] = []

   parse(input: unknown): string {
      if (typeof input !== "string") throw new Error("Expected string")
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
   min(length: number, message?: string) {
      this.checks.push(v => {
         if (v.length < length) throw new Error(message || `String must be at least ${length} chars`)
      })
      return this
   }

   max(length: number, message?: string) {
      this.checks.push(v => {
         if (v.length > length) throw new Error(message || `String must be at most ${length} chars`)
      })
      return this
   }

   length(length: number, message?: string) {
      this.checks.push(v => {
         if (v.length !== length) throw new Error(message || `String must be exactly ${length} chars`)
      })
      return this
   }

   regex(pattern: RegExp, message?: string) {
      this.checks.push(v => {
         if (!pattern.test(v)) throw new Error(message || `String does not match pattern ${pattern}`)
      })
      return this
   }

   email(message?: string) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return this.regex(pattern, message || "Invalid email")
   }

   url(message?: string) {
      const pattern = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-.]*)*\/?$/
      return this.regex(pattern, message || "Invalid URL")
   }

   startsWith(prefix: string, message?: string) {
      this.checks.push(v => {
         if (!v.startsWith(prefix)) throw new Error(message || `String must start with "${prefix}"`)
      })
      return this
   }

   endsWith(suffix: string, message?: string) {
      this.checks.push(v => {
         if (!v.endsWith(suffix)) throw new Error(message || `String must end with "${suffix}"`)
      })
      return this
   }

   includes(substr: string, message?: string) {
      this.checks.push(v => {
         if (!v.includes(substr)) throw new Error(message || `String must include "${substr}"`)
      })
      return this
   }

   // =======================
   // Transformers
   // =======================
   trim() {
      this.transformers.push(v => v.trim())
      return this
   }

   lowercase() {
      this.transformers.push(v => v.toLowerCase())
      return this
   }

   uppercase() {
      this.transformers.push(v => v.toUpperCase())
      return this
   }

   // =======================
   // Optional / Nullable / Default / Transform already inherited
   // from XVType
   // =======================
}

export default XVString
