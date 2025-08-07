import XanType, { XanTypeTypes } from "./Type";

export type XanArrayInfo = "min" | "max" | "unique"

class XanArray extends XanType<XanArrayInfo, any[]> {
   protected type: XanTypeTypes = 'array';

   constructor(type?: XanType<XanArrayInfo, any>) {
      super();
      this.set("type", {
         check: (v: any) => {
            return Array.isArray(v) && (type ? v.every(item => type.parse(item) !== undefined) : true);
         },
         message: `Value should be an array${type ? ` of ${(type as any).type}` : ''}`
      });
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