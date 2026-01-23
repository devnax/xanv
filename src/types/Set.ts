import { Infer } from "../types";
import XVType from "../XVType";

class XVSet<T extends XVType<any> = any> extends XVType<Set<Infer<T>>> {

   constructor(readonly type: T) {
      super();
   }

   protected check(value: any): Set<Infer<T>> {
      if (!(value instanceof Set)) {
         throw new Error(`Value should be a Set, received ${typeof value}`);
      }

      for (const item of Array.from(value)) {
         try {
            this.type.parse(item);
         } catch (error) {
            throw new Error(`Set item should be of type ${this.type.constructor.name}, received ${typeof item}`);
         }
      }
      return value as any
   }

   min(length: number) {
      return this.set("min", (v: any) => {
         if (v.size < length) {
            throw new Error(`Set size should be at least ${length} items, received ${v.size}`);
         }
      }, length);
   }

   max(length: number) {
      return this.set("max", (v: any) => {
         if (v.size > length) {
            throw new Error(`Set size should not exceed ${length} items, received ${v.size}`);
         }
      }, length);
   }


}

export default XVSet;