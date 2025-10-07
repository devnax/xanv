import XanvType from "../XanvType";
import { XanvTransformCallback } from "../types";
export type XVNumberInfo =
   | "length"
   | "min"
   | "max"
   | "positive"
   | "negative"
   | "integer"
   | "float";

class XVNumber<T extends number = number> extends XanvType<XVNumberInfo, T> {

   constructor(length?: number) {
      super();
      if (length) {
         this.set("length", (v: any) => {
            const n = Number(v);
            if (n.toString().length !== length) {
               throw new Error(`Number length should be ${length} digits, received ${n.toString().length}`);
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
      this.set("min", (v: any) => {
         const n = Number(v);
         if (n < value) {
            throw new Error(`Minimum value should be ${value}`);
         }
      }, value);
      return this;
   }

   max(value: number): this {
      this.set("max", (v: any) => {
         const n = Number(v);
         if (n > value) {
            throw new Error(`Maximum value should be ${value}`);
         }
      }, value);
      return this;
   }

   positive(): this {
      this.set("positive", (v: any) => {
         const n = Number(v);
         if (n < 0) {
            throw new Error(`Value should be positive`);
         }
      });
      return this;
   }

   negative(): this {
      this.set("negative", (v: any) => {
         const n = Number(v);
         if (n > 0) {
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

interface XVNumberProto<T = number> {
   parse(value: any): T | undefined | null;
   default(def: T | (() => T)): this;
   transform(cb: XanvTransformCallback<T>): this;
}
Object.assign(XVNumber.prototype as any, {} as XVNumberProto);

