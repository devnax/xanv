import XVType from "../XVType";

class XVNumber<T extends number = number> extends XVType<T> {
   constructor(length?: number) {
      super();
      if (length !== undefined) {
         this.length(length);
      }
   }

   protected check(value: any): T {
      if (typeof value !== "number") {
         throw new Error(`Value should be a number, received ${typeof value}`);
      }
      return value as T
   }

   length(value: number) {
      return this.set("length", (v: unknown) => {
         const n = v as number;
         if (n.toString().length !== value) {
            throw new Error(
               `Number length should be ${value} digits, received ${n.toString().length}`
            );
         }
      }, value);
   }

   min(value: number) {
      return this.set("min", (v: unknown) => {
         const n = v as number;
         if (n < value) {
            throw new Error(`Minimum value should be ${value}, received ${n}`);
         }
      }, value);
   }

   max(value: number) {
      return this.set("max", (v: unknown) => {
         const n = v as number;
         if (n > value) {
            throw new Error(`Maximum value should be ${value}, received ${n}`);
         }
      }, value);
   }

   positive() {
      return this.set("positive", (v: unknown) => {
         const n = v as number;
         if (n < 0) {
            throw new Error(`Value should be positive, received ${n}`);
         }
      });
   }

   negative() {
      return this.set("negative", (v: unknown) => {
         const n = v as number;
         if (n > 0) {
            throw new Error(`Value should be negative, received ${n}`);
         }
      });
   }

   integer() {
      return this.set("integer", (v: unknown) => {
         const n = v as number;
         if (!Number.isInteger(n)) {
            throw new Error(`Value should be an integer, received ${n}`);
         }
      });
   }

   float() {
      return this.set("float", (v: unknown) => {
         const n = v as number;
         if (!Number.isFinite(n) || Number.isInteger(n)) {
            throw new Error(`Value should be a float, received ${n}`);
         }
      });
   }
}

export default XVNumber;
