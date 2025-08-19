import XanvType from "../XanvType";
export type XVNumberInfo =
   | "length"
   | "min"
   | "max"
   | "positive"
   | "negative"
   | "integer"
   | "float";

class XVNumber extends XanvType<XVNumberInfo, number> {

   constructor(length?: number) {
      super();
      if (length) {
         this.set("length", (v) => {
            if (v.toString().length !== length) {
               throw new Error(`Number length should be ${length} digits, received ${v.toString().length}`);
            }
         });
      }
   }

   protected check(value: any): void {
      if (typeof value !== 'number') {
         throw new Error(`Value should be a number, received ${typeof value}`);
      }
   }

   min(value: number): this {
      this.set("min", v => {
         if (v < value) {
            throw new Error(`Minimum value should be ${value}`);
         }
      });
      return this;
   }

   max(value: number): this {
      this.set("max", v => {
         if (v > value) {
            throw new Error(`Maximum value should be ${value}`);
         }
      });
      return this;
   }

   positive(): this {
      this.set("positive", v => {
         if (v < 0) {
            throw new Error(`Value should be positive`);
         }
      });
      return this;
   }

   negative(): this {
      this.set("negative", v => {
         if (v > 0) {
            throw new Error(`Value should be negative`);
         }
      });
      return this;
   }

   integer(): this {
      this.set("integer", v => {
         if (!Number.isInteger(v)) {
            throw new Error(`Value should be an integer`);
         }
      });
      return this;
   }

   float(): this {
      this.set("float", v => {
         if (!Number.isFinite(v) || Number.isInteger(v)) {
            throw new Error(`Value should be a float`);
         }
      });
      return this;
   }

}

export default XVNumber;