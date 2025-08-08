import XanvType from "../XanvType";
import { XVEnumValues } from "../types";

export type XVEnumInfo = "";

class XVEnum extends XanvType<XVEnumInfo, XVEnumValues> {
   name: string = 'XanvEnum';
   private values: XVEnumValues;

   constructor(values: XVEnumValues) {
      super();
      if (!Array.isArray(values) || values.length === 0) {
         throw new Error("Enum values must be a non-empty array");
      }
      this.values = values;
   }

   check(value: any): void {
      if (typeof value !== 'string' && typeof value !== 'number') {
         throw new Error(`Value should be a string or number, received ${typeof value}`);
      }

      if (!this.values.includes(value)) {
         throw new Error(`Value should be one of the enum values: ${this.values.join(', ')}`);
      }
   }

}

export default XVEnum;