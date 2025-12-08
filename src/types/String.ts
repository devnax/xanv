import XanvType from "../XanvType";

class XVString<T extends string = string> extends XanvType<T> {

   constructor(length?: number) {
      super();
      if (length) {
         this.length(length);
      }
   }

   protected check(value: any): void {
      if (typeof value !== 'string') {
         throw new Error(`Value should be a string, received ${typeof value}`);
      }
   }

   length(length: number) {
      return this.set("length", (v: any) => {
         const s = v as string;
         if (s.length !== length) {
            throw new Error(`String length should be ${length} characters, received ${s.length}`);
         }
      }, length)
   }

   min(length: number) {
      return this.set("min", (v: any) => {
         const s = v as string;
         if (s.length < length) {
            throw new Error(`Minimum length should be ${length} characters, received ${s.length}`);
         }
      }, length);
   }

   max(length: number) {
      return this.set("max", (v: any) => {
         const s = v as string;
         if (s.length > length) {
            throw new Error(`Maximum length should be ${length} characters, received ${s.length}`);
         }
      }, length);
   }

   email() {
      return this.set("email", (v: any) => {
         const s = String(v);
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(s)) {
            throw new Error(`String should be a valid email address`);
         }
      });
   }

   uppercase() {
      return this.set("uppercase", (v: any) => {
         const s = String(v);
         if (s !== s.toUpperCase()) {
            throw new Error(`String should be in uppercase`);
         }
      });
   }

   lowercase() {
      return this.set("lowercase", (v: any) => {
         const s = String(v);
         if (s !== s.toLowerCase()) {
            throw new Error(`String should be in lowercase`);
         }
      });
   }

   number() {
      return this.set("number", (v: any) => {
         const s = String(v);
         if (isNaN(Number(s))) {
            throw new Error(`String should be a valid number`);
         }
      });
   }

   date() {
      return this.set("date", (v: any) => {
         const s = String(v);
         const date = new Date(s);
         if (isNaN(date.getTime())) {
            throw new Error(`String should be a valid date`);
         }
      });
   }

   base64() {
      return this.set("base64", (v: any) => {
         const s = String(v);
         if (!/^[A-Za-z0-9+/]+={0,2}$/.test(s)) {
            throw new Error(`String should be a valid Base64 encoded string`);
         }
      });
   }

}

export default XVString;

