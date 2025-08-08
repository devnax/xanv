import XanType, { XanTypeTypes } from "./Type";
import { XanvInstanceType } from "./types";

export type XanArrayInfo = "min" | "max" | "unique"

class XanArray extends XanType<XanArrayInfo, any> {
   protected type: XanTypeTypes = 'array';
   private itemType?: XanvInstanceType;

   constructor(type?: XanvInstanceType) {
      super();
      this.itemType = type;
   }

   protected check(value: any): void {
      if (!Array.isArray(value)) {
         throw new Error(`Value should be an array, received ${typeof value}`);
      }
   }

   min(length: number): this {
      this.set("min", {
         check: (v: any[]) => v.length >= length,
         message: `Array length should be at least ${length} items`
      });
      return this;
   }

   max(length: number): this {
      this.set("max", {
         check: (v: any[]) => v.length <= length,
         message: `Array length should be at most ${length} items`
      });
      return this;
   }

   unique(): this {
      this.set("unique", {
         check: (v: any[]) => new Set(v).size === v.length,
         message: `Array items should be unique`
      });
      return this;
   }

}

export default XanArray;