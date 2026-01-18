import XVMap from "./Map";
import XVObject from "./Object";
import XVRecord from "./Record";
import XanvType from "../XanvType";
import { XVInstanceType, Infer } from "../types";

class XVArray<T extends XVInstanceType = XVInstanceType> extends XanvType<Infer<T>[]> {
   private type?: T;
   private length?: number;

   constructor(type?: T, length?: number) {
      super();
      this.type = type;
      this.length = length;
   }

   protected check(value: unknown): Infer<T>[] {
      if (!Array.isArray(value)) {
         throw new Error(`Value should be an array, received ${typeof value}`);
      }

      if (this.length !== undefined && value.length !== this.length) {
         throw new Error(`Array length should be ${this.length}, received ${value.length}`);
      }

      const result: Infer<T>[] = [];

      if (this.type) {
         for (let i = 0; i < value.length; i++) {
            try {
               result[i] = this.type.parse(value[i]) as Infer<T>;
            } catch (err: any) {
               throw new Error(
                  `Array item at index ${i} should be of type ${this.type.constructor.name}, received ${typeof value[i]}: ${err.message}`
               );
            }
         }
      } else {
         result.push(...(value as any[]));
      }

      return result;
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
