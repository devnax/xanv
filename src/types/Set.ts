import { XVInstanceType } from "../types";
import XanvType from "../XanvType";

export type XVSetInfo = "min" | "max";

class XVSet extends XanvType<XVSetInfo, Set<any>> {

   private XVtype: XVInstanceType;

   constructor(XVtype: XVInstanceType) {
      super();
      this.XVtype = XVtype;
   }

   check(value: any): void {
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

   min(length: number): this {
      this.set("min", (v: any) => {
         if (v.size < length) {
            throw new Error(`Set size should be at least ${length} items, received ${v.size}`);
         }
      });
      return this;
   }

   max(length: number): this {
      this.set("max", (v: any) => {
         if (v.size > length) {
            throw new Error(`Set size should not exceed ${length} items, received ${v.size}`);
         }
      });
      return this;
   }


}

export default XVSet;