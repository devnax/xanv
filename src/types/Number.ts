import XanvType from "../XanvType";
import { XanvTransformCallback } from "../types";

class XVNumber<T extends number = number> extends XanvType<T> {

   constructor(length?: number) {
      super();
      if (length) {
         this.length(length);
      }
   }

   protected check(value: any): void {
      if (typeof value !== 'number') {
         throw new Error(`Value should be a number, received ${typeof value}`);
      }
   }

   length(value: number) {
      return this.set("length", (v: any) => {
         const n = Number(v);
         if (n.toString().length !== value) {
            throw new Error(`Number length should be ${value} digits, received ${n.toString().length}`);
         }
      }, value);
   }

   min(value: number) {
      return this.set("min", (v: any) => {
         const n = Number(v);
         if (n < value) {
            throw new Error(`Minimum value should be ${value}`);
         }
      }, value);
   }

   max(value: number) {
      return this.set("max", (v: any) => {
         const n = Number(v);
         if (n > value) {
            throw new Error(`Maximum value should be ${value}`);
         }
      }, value);
   }

   positive() {
      return this.set("positive", (v: any) => {
         const n = Number(v);
         if (n < 0) {
            throw new Error(`Value should be positive`);
         }
      });
   }

   negative() {
      return this.set("negative", (v: any) => {
         const n = Number(v);
         if (n > 0) {
            throw new Error(`Value should be negative`);
         }
      });
   }

   integer() {
      return this.set("integer", v => {
         if (!Number.isInteger(v)) {
            throw new Error(`Value should be an integer`);
         }
      });
   }

   float() {
      return this.set("float", v => {
         if (!Number.isFinite(v) || Number.isInteger(v)) {
            throw new Error(`Value should be a float`);
         }
      });
   }

}

export default XVNumber;