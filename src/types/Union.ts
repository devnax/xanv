import { XanvInstanceType } from "./types";
import XanBase, { XanBaseTypes } from "./XanBase";

export type XanUnionInfo = "min" | "max";

class XanUnion extends XanBase<XanUnionInfo, "set"> {
   protected type: XanBaseTypes = 'set';
   private xantype: XanvInstanceType[];

   constructor(xantype: XanvInstanceType[]) {
      super();
      this.xantype = xantype;
   }

   check(value: any): void {
      if (!Array.isArray(value)) {
         throw new Error(`Value should be an array, received ${typeof value}`);
      }

      if (value.length !== this.xantype.length) {
         throw new Error(`Union length should be ${this.xantype.length}, received ${value.length}`);
      }

      let match = false;
      for (let i = 0; i < value.length; i++) {
         const item = value[i];
         try {
            this.xantype[i].parse(item);
            match = true;
            break
         } catch (error) { }
      }

      if (!match) {
         throw new Error(`Value does not match any of the union types`);
      }
   }

}

export default XanUnion;