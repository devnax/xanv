import { XanvInstanceType } from "./types";
import XanBase, { XanBaseTypes } from "./XanBase";

export type XanSetInfo = "min" | "max";

class XanSet extends XanBase<XanSetInfo, "set"> {
   protected type: XanBaseTypes = 'set';
   private xantype: XanvInstanceType;

   constructor(xantype: XanvInstanceType) {
      super();
      this.xantype = xantype;
   }

   check(value: any): void {
      if (!(value instanceof Set)) {
         throw new Error(`Value should be a Set, received ${typeof value}`);
      }

      for (const item of Array.from(value)) {
         this.xantype.parse(item);
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

export default XanSet;