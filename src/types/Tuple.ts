import { XVInstanceType } from "../types";
import XanvType from "../XanvType";

class XVTuple<T extends any[] = any[]> extends XanvType<T> {
   private type: XVInstanceType[];

   constructor(type: XVInstanceType[]) {
      super();
      this.type = type;
   }

   protected check(value: any) {
      if (!Array.isArray(value)) {
         throw new Error(`Value should be a tuple, received ${typeof value}`);
      }

      if (value.length !== this.type.length) {
         throw new Error(`Tuple length should be ${this.type.length}, received ${value.length}`);
      }

      for (let i = 0; i < value.length; i++) {
         try {
            value[i] = this.type[i].parse(value[i]);
         } catch (error: any) {
            throw new Error(`Tuple item at index ${i} should be of type ${this.type[i].constructor.name}, received ${typeof value[i]}`);
         }
      }
      return value;
   }

}

export default XVTuple;