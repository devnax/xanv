import { XVInstanceType } from "../types";
import XanvType from "../XanvType";

class XVSet<T = any> extends XanvType<Set<T>> {

   private XVtype: XVInstanceType;

   constructor(XVtype: XVInstanceType) {
      super();
      this.XVtype = XVtype;
   }

   protected check(value: any): void {
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