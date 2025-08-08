import XanBase, { XanBaseTypes } from "./XanBase";

export type XanStringInfo =
   | "min"
   | "max"
   | "length"
   | "email"
   | "toUpperCase"
   | "toLowerCase"
   | "number"
   | "date";

class XanString extends XanBase<XanStringInfo, string> {
   protected type: XanBaseTypes = 'string';

   constructor(length?: number) {
      super();
      if (length) {
         this.set("length", (v) => {
            if (v.length !== length) {
               throw new Error(`String length should be ${length} characters, received ${v.length}`);
            }
         })
      }
   }

   protected check(value: string): void {
      if (typeof value !== 'string') {
         throw new Error(`Value should be a string, received ${typeof value}`);
      }
   }

   min(length: number): this {
      this.set("min", v => {
         if (v.length < length) {
            throw new Error(`Minimum length should be ${length} characters, received ${v.length}`);
         }
      });
      return this
   }

   max(length: number): this {
      this.set("max", v => {
         if (v.length > length) {
            throw new Error(`Maximum length should be ${length} characters, received ${v.length}`);
         }
      });
      return this
   }

   email(): this {
      this.set("email", (v: string) => {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(v)) {
            throw new Error(`String should be a valid email address`);
         }
      });
      return this
   }

   toUpperCase(): this {
      this.set("toUpperCase", v => {
         if (v !== v.toUpperCase()) {
            throw new Error(`String should be in uppercase`);
         }
      });
      return this
   }

   toLowerCase(): this {
      this.set("toLowerCase", v => {
         if (v !== v.toLowerCase()) {
            throw new Error(`String should be in lowercase`);
         }
      });
      return this
   }

   number(): this {
      this.set("number", (v: string) => {
         if (isNaN(Number(v))) {
            throw new Error(`String should be a valid number`);
         }
      });
      return this
   }

   date(): this {
      this.set("date", (v: string) => {
         const date = new Date(v);
         if (isNaN(date.getTime())) {
            throw new Error(`String should be a valid date`);
         }
      });
      return this;
   }

}

export default XanString;