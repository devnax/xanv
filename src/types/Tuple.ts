import { XanvInstanceType } from "./types";
import XanBase, { XanBaseTypes } from "./XanBase";

export type XanTupleInfo = "min" | "max";

class XanTuple extends XanBase<XanTupleInfo, "set"> {
   protected type: XanBaseTypes = 'set';
   private xantype: XanvInstanceType[];

   constructor(xantype: XanvInstanceType[]) {
      super();
      this.xantype = xantype;
   }

   check(value: any): void {
      if (!Array.isArray(value)) {
         throw new Error(`Value should be a tuple, received ${typeof value}`);
      }

      if (value.length !== this.xantype.length) {
         throw new Error(`Tuple length should be ${this.xantype.length}, received ${value.length}`);
      }

      for (let i = 0; i < value.length; i++) {
         value[i] = this.xantype[i].parse(value[i]);
      }
   }

}

export default XanTuple;