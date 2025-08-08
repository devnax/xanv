import XanBase, { XanBaseTypes } from "./XanBase";
import { XanvInstanceType } from "./types";

export type XanArrayInfo = "min" | "max" | "unique"

class XanArray extends XanBase<XanArrayInfo, any> {
   protected type: XanBaseTypes = 'array';
   private itemType?: XanvInstanceType;

   constructor(type?: XanvInstanceType) {
      super();
      this.itemType = type;
   }

   protected check(value: any): void {
      if (!Array.isArray(value)) {
         throw new Error(`Value should be an array, received ${typeof value}`);
      }

      if (this.itemType) {
         this.itemType.parse(value);
      }
   }

   min(length: number): this {
      this.set("min", v => {
         if (v.length < length) {
            throw new Error(`Array length should be at least ${length} items, received ${v.length}`)
         }
      });
      return this;
   }

   max(length: number): this {
      this.set("max", v => {
         if (v.length > length) {
            throw new Error(`Array length should not exceed ${length} items, received ${v.length}`)
         }
      });
      return this;
   }

   unique(): this {
      this.set("unique", v => {
         const uniqueItems = new Set(v);
         if (uniqueItems.size !== v.length) {
            throw new Error(`Array items should be unique, found duplicates`);
         }
      });
      return this;
   }

}

export default XanArray;