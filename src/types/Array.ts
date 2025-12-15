
import XVMap from "./Map";
import XVObject from "./Object";
import XVRecord from "./Record";
import XanvType from "../XanvType";
import { XVInstanceType } from "../types";

class XVArray<T = any[]> extends XanvType<T[]> {
   private type?: XVInstanceType;
   private length?: number;
   constructor(type?: XVInstanceType, length?: number) {
      super();
      this.type = type;
      this.length = length;
   }

   protected check(value: any): void {
      let _value = value;
      if (!Array.isArray(value)) {
         throw new Error(`Value should be an array, received ${typeof value}`);
      }

      if (this.length !== undefined && value.length !== this.length) {
         throw new Error(`Array length should be ${this.length}, received ${value.length}`);
      }

      if (this.type) {
         for (let i = 0; i < value.length; i++) {
            const item = value[i];
            try {
               _value[i] = this.type.parse(item);
            } catch (error: any) {
               throw new Error(`Array item at index ${i} should be of type ${this.type.constructor.name}, received ${typeof item}: ${error.message}`);
            }
         }
      }
      return _value;
   }

   min(length: number) {
      return this.set("min", v => {
         if (v.length < length) {
            throw new Error(`Array length should be at least ${length} items, received ${v.length}`)
         }
      }, length);
   }

   max(length: number) {
      return this.set("max", v => {
         if (v.length > length) {
            throw new Error(`Array length should not exceed ${length} items, received ${v.length}`)
         }
      }, length);
   }

   unique() {
      return this.set("unique", v => {
         let format: any = []
         for (let i = 0; i < v.length; i++) {
            if (this.type instanceof XVObject || this.type instanceof XVRecord) {
               const u = JSON.stringify(v[i]);
               if (format.includes(u)) {
                  throw new Error(`Array items should be unique, found duplicate: ${u}`);
               } else {
                  format.push(u);
               }
            } else if (this.type instanceof XVArray) {
               const u = JSON.stringify(v[i]);
               if (format.includes(u)) {
                  throw new Error(`Array items should be unique, found duplicate: ${u}`);
               } else {
                  format.push(u);
               }
            } else if (this.type instanceof XVMap) {
               const u = JSON.stringify(Array.from(v.entries()));
               if (format.includes(u)) {
                  throw new Error(`Array items should be unique, found duplicate: ${u}`);
               } else {
                  format.push(u);
               }
            }
         }

         const uitems = new Set(v);
         if (uitems.size !== v.length) {
            throw new Error(`Array items should be unique, found duplicates`);
         }
      });
   }
}

export default XVArray;