import { XVObjectType } from "../types";
import XanvType from "../XanvType";

export type XVObjectInfo = "";

class XVObject extends XanvType<XVObjectInfo, XVObjectType> {
   private arg?: XVObjectType;

   constructor(arg?: XVObjectType) {
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
            try {
               value[key] = itemType.parse(value[key]);
            } catch (error: any) {
               throw new Error(`Property '${key}' should be of type ${itemType.constructor.name}, received ${typeof value[key]}`);
            }
         }
      }
      return value;
   }

}

export default XVObject;