import { XanvInstanceType } from "./types";
import XanBase, { XanBaseTypes } from "./XanBase";

export type XanObjectInfo = "";

export type XanObjectKeyType = string | number | symbol;
export type XanObjectValueType = XanvInstanceType;
export type XanObjectType = Record<XanObjectKeyType, XanObjectValueType>;

class XanObject extends XanBase<XanObjectInfo, "object"> {
   protected type: XanBaseTypes = 'object';
   private arg?: XanObjectType;

   constructor(arg?: XanObjectType) {
      super();
      if (arg && (typeof arg !== 'object' || arg === null || Array.isArray(arg))) {
         throw new Error("Argument should be a non-null object");
      }
      this.arg = arg;
   }

   check(value: any): void {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
         throw new Error(`Value should be an object, received ${typeof value}`);
      }

      if (this.arg) {
         for (const key in this.arg) {
            const itemType = this.arg[key];
            value[key] = itemType.parse(value[key]);
         }
      }
   }

}

export default XanObject;