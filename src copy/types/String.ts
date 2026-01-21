import XanvType from "../XanvType";

class XVString extends XanvType<string, unknown> {
   constructor(length?: number) {
      super();
      if (length !== undefined) {
         this.length(length);
      }
   }

   protected check(value: unknown): string {
      if (typeof value !== "string") {
         throw new Error(`Value should be a string, received ${typeof value}`);
      }
      return value;
   }

   length(length: number) {
      return this.set(
         "length",
         (v: unknown) => {
            const s = String(v);
            if (s.length !== length) {
               throw new Error(
                  `String length should be ${length} characters, received ${s.length}`
               );
            }
         },
         length
      );
   }

   min(length: number) {
      return this.set(
         "min",
         (v: unknown) => {
            const s = String(v);
            if (s.length < length) {
               throw new Error(
                  `Minimum length should be ${length} characters, received ${s.length}`
               );
            }
         },
         length
      );
   }

   max(length: number) {
      return this.set(
         "max",
         (v: unknown) => {
            const s = String(v);
            if (s.length > length) {
               throw new Error(
                  `Maximum length should be ${length} characters, received ${s.length}`
               );
            }
         },
         length
      );
   }

   email() {
      return this.set("email", (v: unknown) => {
         const s = String(v);
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(s)) {
            throw new Error(`String should be a valid email address`);
         }
      });
   }

   uppercase() {
      return this.set("uppercase", (v: unknown) => {
         const s = String(v);
         if (s !== s.toUpperCase()) {
            throw new Error(`String should be in uppercase`);
         }
      });
   }

   lowercase() {
      return this.set("lowercase", (v: unknown) => {
         const s = String(v);
         if (s !== s.toLowerCase()) {
            throw new Error(`String should be in lowercase`);
         }
      });
   }

   number() {
      return this.set("number", (v: unknown) => {
         const s = String(v);
         if (isNaN(Number(s))) {
            throw new Error(`String should be a valid number`);
         }
      });
   }

   date() {
      return this.set("date", (v: unknown) => {
         const s = String(v);
         const d = new Date(s);
         if (isNaN(d.getTime())) {
            throw new Error(`String should be a valid date`);
         }
      });
   }

   base64() {
      return this.set("base64", (v: unknown) => {
         const s = String(v);
         if (!/^[A-Za-z0-9+/]+={0,2}$/.test(s)) {
            throw new Error(`String should be a valid Base64 encoded string`);
         }
      });
   }
}

export default XVString;
