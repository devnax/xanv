import { XVInstanceType } from "../types";
import XanvType from "../XanvType";

class XVSet<T extends XVInstanceType = any> extends XanvType<T> {

   private XVtype: T;

   constructor(XVtype: T) {
      super();
      this.XVtype = XVtype;
   }

   protected check(value: any): T {
      if (!(value instanceof Set)) {
         throw new Error(`Value should be a Set, received ${typeof value}`);
      }

      for (const item of Array.from(value)) {
         try {
            this.XVtype.parse(item);
         } catch (error) {
            throw new Error(`Set item should be of type ${this.XVtype.constructor.name}, received ${typeof item}`);
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