import XanvType from "../XanvType";
import { XVEnumValues } from "../types";

class XVEnum<T extends string | number = string | number> extends XanvType<T> {
   private values: (string | number)[];

   constructor(values: XVEnumValues) {
      super();
      if (typeof values === 'object' && !Array.isArray(values) && values !== null) {
         values = Object.keys(values)
      }
      if (!Array.isArray(values) || values.length === 0) {
         throw new Error("Enum values must be a non-empty array");
      }
      this.values = values;
   }

   protected check(value: any): void {
      if (typeof value !== 'string' && typeof value !== 'number') {
         throw new Error(`Value should be a string or number, received ${typeof value}`);
      }

      if (!this.values.includes(value)) {
         throw new Error(`Value should be one of the enum values: ${this.values.join(', ')}`);
      }
   }

}

export default XVEnum;