import XVType from "../XVType"

export default class XVArray<T> extends XVType<T[]> {
   constructor(private item: XVType<T>) {
      super()
   }

   parse(input: unknown): T[] {
      if (!Array.isArray(input)) throw new Error("Expected array")
      const arr = input.map(v => this.item.parse(v))

      // run checks
      for (const check of this.checks) check(arr)

      return arr
   }

   // =======================
   // Array validators
   // =======================
   min(length: number, message?: string): XVArray<T> {
      this.checks.push(arr => {
         if (arr.length < length) throw new Error(message || `Array must have at least ${length} items`)
      })
      return this
   }

   max(length: number, message?: string): XVArray<T> {
      this.checks.push(arr => {
         if (arr.length > length) throw new Error(message || `Array must have at most ${length} items`)
      })
      return this
   }

   length(length: number, message?: string): XVArray<T> {
      this.checks.push(arr => {
         if (arr.length !== length) throw new Error(message || `Array must have exactly ${length} items`)
      })
      return this
   }

}
