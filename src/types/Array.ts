import XVType from "../XVType";
import { Infer } from "../types";

class XVArray<T extends XVType<any>> extends XVType<Infer<T>[]> {
   constructor(readonly type: T) {
      super()
   }

   protected check(input: unknown): Infer<T>[] {
      if (!Array.isArray(input)) throw new Error("Expected array")
      const arr = input.map(v => this.type.parse(v))
      return arr as Infer<T>[]
   }

   min(length: number) {
      return this.set("min", (v: unknown) => {
         const arr = v as Infer<T>[];
         if (arr.length < length) {
            throw new Error(`Array length should be at least ${length} items, received ${arr.length}`);
         }
      }, length);
   }


   max(length: number) {
      return this.set("max", (v: unknown) => {
         const arr = v as Infer<T>[];
         if (arr.length > length) {
            throw new Error(`Array length should not exceed ${length} items, received ${arr.length}`);
         }
      }, length);
   }

   unique() {
      return this.set("unique", (v: unknown) => {
         const arr = v as Infer<T>[];
         const seen = new Set<string>();

         for (const item of arr) {
            const key = JSON.stringify(item);
            if (seen.has(key)) {
               throw new Error(`Array items should be unique, found duplicate: ${key}`);
            }
            seen.add(key);
         }
      });
   }
}

export default XVArray;
