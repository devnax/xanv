import XanvType from "../XanvType";
import { XVObjectType } from "../types";

class XVObject<T = any> extends XanvType<T> {
   private arg?: XVObjectType;

   constructor(arg?: XVObjectType) {
      super();
      if (arg && (typeof arg !== 'object' || arg === null || Array.isArray(arg))) {
         throw new Error("Argument should be a non-null object");
      }
      this.arg = arg;
   }

   protected check(value: any): void {
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
