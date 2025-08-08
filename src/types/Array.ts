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
         for (let i = 0; i < value.length; i++) {
            const item = value[i];
            value[i] = this.itemType.parse(item);
         }
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
         let format: any = []
         for (let i = 0; i < v.length; i++) {
            // is array item unique?
            if (Array.isArray(v[i]) || typeof v[i] !== 'object') {
               const u = JSON.stringify(v[i]);
               if (format.includes(u)) {
                  throw new Error(`Array items should be unique, found duplicate: ${u}`);
               } else {
                  format.push(u);
               }
            } else if (typeof v[i] === 'object' && v[i] !== null) {
               const u = JSON.stringify(v[i]);
               if (format.includes(u)) {
                  throw new Error(`Array items should be unique, found duplicate: ${u}`);
               } else {
                  format.push(u);
               }
            }
         }

         const uniqueItems = new Set(v);
         if (uniqueItems.size !== v.length) {
            throw new Error(`Array items should be unique, found duplicates`);
         }
      });
      return this;
   }

}

export default XanArray;