import { XVInstanceType } from "../types";
import XanvType from "../XanvType";

export type XVUnionInfo = "min" | "max";

class XVUnion extends XanvType<XVUnionInfo, any> {
   name: string = 'XanvUnion';
   private type: XVInstanceType[];

   constructor(type: XVInstanceType[]) {
      super();
      this.type = type;
   }

   check(value: any): void {
      if (!Array.isArray(value)) {
         throw new Error(`Value should be an array, received ${typeof value}`);
      }

      if (value.length !== this.type.length) {
         throw new Error(`Union length should be ${this.type.length}, received ${value.length}`);
      }

      let match = false;

      for (const t of this.type) {
         try {
            value = t.parse(value);
            match = true;
            break; // If one type matches, we can stop checking
         } catch (e) {
            // Ignore the error and continue checking other types
         }
      }

      if (!match) {
         throw new Error(`Value does not match any of the union types: ${this.type.map(t => t.name).join(', ')}`);
      }
   }

}

export default XVUnion;