import XanType, { XanTypeTypes } from "./Type";

export type XanStringInfo =
   | "min"
   | "max"
   | "length"
   | "email"
   | "toUpperCase"
   | "toLowerCase"
   | "number";

class XanString extends XanType<XanStringInfo, string> {
   protected type: XanTypeTypes = 'string';

   constructor(length?: number) {
      super();
      this.set("type", {
         check: (v: any) => typeof v === 'string',
         message: `Value should be a string`
      })

      if (length) {
         this.set("length", {
            check: (v: string) => v.length === length,
            message: `String length should be ${length} characters`
         });
      }
   }

   min(length: number): this {
      this.set("min", {
         check: (v: string) => v.length >= length,
         message: `Minimum length should be ${length} characters`
      });
      return this
   }

   max(length: number): this {
      this.set("max", {
         check: (v: string) => v.length <= length,
         message: `Maximum length should be ${length} characters`
      });
      return this
   }

   email(): this {
      this.set("email", {
         check: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
         message: v => `Invalid email format: ${v}`
      });
      return this
   }

   toUpperCase(): this {
      this.set("toUpperCase", {
         check: (v: string) => v === v.toUpperCase(),
         message: `String should be in uppercase`
      });
      return this
   }

   toLowerCase(): this {
      this.set("toLowerCase", {
         check: (v: string) => v === v.toLowerCase(),
         message: `String should be in lowercase`
      });
      return this
   }

   number(): this {
      this.set("number", {
         check: (v: string) => !isNaN(Number(v)),
         message: `String should represent a number`
      });
      return this
   }

}

export default XanString;