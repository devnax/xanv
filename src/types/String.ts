import XanvType from "../XanvType";
import { XanvTransformCallback } from "../types";

export type XVStringInfo =
   | "min"
   | "max"
   | "length"
   | "email"
   | "toUpperCase"
   | "toLowerCase"
   | "number"
   | "date"
   | "base64";

class XVString<T extends string = string> extends XanvType<XVStringInfo, T> {

   constructor(length?: number) {
      super();
      if (length) {
         this.set("length", (v: any) => {
            const s = v as string;
            if (s.length !== length) {
               throw new Error(`String length should be ${length} characters, received ${s.length}`);
            }
         })
      }
   }

   protected check(value: any): void {
      if (typeof value !== 'string') {
         throw new Error(`Value should be a string, received ${typeof value}`);
      }
   }

   min(length: number): this {
      this.set("min", (v: any) => {
         const s = v as string;
         if (s.length < length) {
            throw new Error(`Minimum length should be ${length} characters, received ${s.length}`);
         }
      }, length);
      return this
   }

   max(length: number): this {
      this.set("max", (v: any) => {
         const s = v as string;
         if (s.length > length) {
            throw new Error(`Maximum length should be ${length} characters, received ${s.length}`);
         }
      }, length);
      return this
   }

   email(): this {
      this.set("email", (v: any) => {
         const s = String(v);
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(s)) {
            throw new Error(`String should be a valid email address`);
         }
      });
      return this
   }

   toUpperCase(): this {
      this.set("toUpperCase", (v: any) => {
         const s = String(v);
         if (s !== s.toUpperCase()) {
            throw new Error(`String should be in uppercase`);
         }
      });
      return this
   }

   toLowerCase(): this {
      this.set("toLowerCase", (v: any) => {
         const s = String(v);
         if (s !== s.toLowerCase()) {
            throw new Error(`String should be in lowercase`);
         }
      });
      return this
   }

   number(): this {
      this.set("number", (v: any) => {
         const s = String(v);
         if (isNaN(Number(s))) {
            throw new Error(`String should be a valid number`);
         }
      });
      return this
   }

   date(): this {
      this.set("date", (v: any) => {
         const s = String(v);
         const date = new Date(s);
         if (isNaN(date.getTime())) {
            throw new Error(`String should be a valid date`);
         }
      });
      return this;
   }

   base64(): this {
      this.set("base64", (v: any) => {
         const s = String(v);
         if (!/^[A-Za-z0-9+/]+={0,2}$/.test(s)) {
            throw new Error(`String should be a valid Base64 encoded string`);
         }
      });
      return this;
   }

}

export default XVString;

interface XVStringProto<T = string> {
   parse(value: any): T | undefined | null;
   default(def: T | (() => T)): this;
   transform(cb: XanvTransformCallback<T>): this;
}
Object.assign(XVString.prototype as any, {} as XVStringProto);

