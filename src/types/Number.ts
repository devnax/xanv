import XanType, { XanTypeTypes } from "./Type";

export type XanNumberInfo =
   | "length"
   | "min"
   | "max"
   | "positive"
   | "negative"
   | "integer"
   | "float";

class XanNumber extends XanType<XanNumberInfo, number> {
   protected type: XanTypeTypes = 'number';

   constructor(length?: number) {
      super();
      this.set("type", {
         check: (v: any) => typeof v === 'number',
         message: `Value should be a number`
      });

      if (length) {
         this.set("length", {
            check: (v: number) => v.toString().length === length,
            message: `Number length should be ${length} digits`
         });
      }
   }

   min(value: number): this {
      this.set("min", {
         check: (v: number) => v >= value,
         message: `Minimum value should be ${value}`
      });
      return this;
   }

   max(value: number): this {
      this.set("max", {
         check: (v: number) => v <= value,
         message: `Maximum value should be ${value}`
      });
      return this;
   }

   positive(): this {
      this.set("positive", {
         check: (v: number) => v > 0,
         message: `Value should be positive`
      });
      return this;
   }

   negative(): this {
      this.set("negative", {
         check: (v: number) => v < 0,
         message: `Value should be negative`
      });
      return this;
   }

   integer(): this {
      this.set("integer", {
         check: (v: number) => Number.isInteger(v),
         message: `Value should be an integer`
      });
      return this;
   }

   float(): this {
      this.set("float", {
         check: (v: number) => !Number.isInteger(v),
         message: `Value should be a float`
      });
      return this;
   }

}

export default XanNumber;