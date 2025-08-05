import XanType from "./XanType";

export type XanStringInfo =
   | "min"
   | "max"
   | "length"
   | "pattern"
   | "optional"

class XanString extends XanType<XanStringInfo> {
   protected _type = 'string';

   min(length: number): this {
      this._info.set("min", {
         check: (v: string) => v.length >= length,
         message: `Minimum length should be ${length} characters`
      });
      return this
   }

   max(length: number): this {
      this._info.set("max", {
         check: (v: string) => v.length <= length,
         message: `Maximum length should be ${length} characters`
      });
      return this
   }

   length(length: number): this {
      this._info.set("length", {
         check: (v: string) => v.length === length,
         message: `Length should be exactly ${length} characters`
      });
      return this
   }

}

export default XanString;