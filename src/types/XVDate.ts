import XVType from "../XVType"

export default class XVDate extends XVType<Date> {
   private transformers: ((v: Date) => Date)[] = []

   parse(input: unknown): Date {
      let date: Date

      if (input instanceof Date) {
         date = input
      } else if (typeof input === "string" || typeof input === "number") {
         date = new Date(input)
      } else {
         throw new Error("Expected Date, timestamp, or date string")
      }

      if (isNaN(date.getTime())) throw new Error("Invalid Date")

      // apply transformers
      for (const fn of this.transformers) date = fn(date)

      // run checks
      for (const check of this.checks) check(date)

      return date
   }

   // =======================
   // Validators
   // =======================
   min(minDate: Date, msg?: string): this {
      this.checks.push(d => {
         if (d < minDate) throw new Error(msg || `Date must be >= ${minDate.toISOString()}`)
      })
      return this
   }

   max(maxDate: Date, msg?: string): this {
      this.checks.push(d => {
         if (d > maxDate) throw new Error(msg || `Date must be <= ${maxDate.toISOString()}`)
      })
      return this
   }

   // =======================
   // Transformers
   // =======================
   startOfDay(): this {
      this.transformers.push(d => {
         const newDate = new Date(d)
         newDate.setHours(0, 0, 0, 0)
         return newDate
      })
      return this
   }

   endOfDay(): this {
      this.transformers.push(d => {
         const newDate = new Date(d)
         newDate.setHours(23, 59, 59, 999)
         return newDate
      })
      return this
   }

   addDays(days: number): this {
      this.transformers.push(d => {
         const newDate = new Date(d)
         newDate.setDate(newDate.getDate() + days)
         return newDate
      })
      return this
   }

   addMonths(months: number): this {
      this.transformers.push(d => {
         const newDate = new Date(d)
         newDate.setMonth(newDate.getMonth() + months)
         return newDate
      })
      return this
   }

   addYears(years: number): this {
      this.transformers.push(d => {
         const newDate = new Date(d)
         newDate.setFullYear(newDate.getFullYear() + years)
         return newDate
      })
      return this
   }

   // =======================
   // Optional / Nullable / Default inherited from XVType
   // =======================
}
