// XVObject.ts
import XanvType from "../XanvType";
import { Infer, XVInstanceType } from "../types";

export type XVObjectShape = Record<string, XVInstanceType | any>;

class XVObject<O extends XVObjectShape = any> extends XanvType<{ [K in keyof O]: Infer<O[K]> }> {
   public readonly arg?: O;

   constructor(arg?: O) {
      super();
      this.arg = arg;
   }

   protected check(value: any): { [K in keyof O]: Infer<O[K]> } {
      const result: any = {};
      for (const key in this.arg) {
         const itemType = this.arg[key];
         result[key] = itemType.parse(value[key]);
      }
      return result;
   }
}


export default XVObject;
