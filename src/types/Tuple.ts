import { XVInstanceType } from "../types";
import XanvType from "../XanvType";

export type XVTupleInfo = "min" | "max";

class XVTuple<T extends any[] = any[]> extends XanvType<XVTupleInfo, T> {
   private type: XVInstanceType[];

   constructor(type: XVInstanceType[]) {
      super();
      this.type = type;
   }

   check(value: any) {
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

interface XVTupleProto<T extends any[] = any[]> {
   parse(value: any): T | undefined | null;
   default(def: T | (() => T)): this;
   transform(cb: import("../types").XanvTransformCallback<T>): this;
}
Object.assign(XVTuple.prototype as any, {} as XVTupleProto);