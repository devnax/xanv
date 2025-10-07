import XanvType from "../XanvType";
import { XVEnumValues } from "../types";

export type XVEnumInfo = "";

class XVEnum<T extends string | number = string | number> extends XanvType<XVEnumInfo, T> {
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

interface XVEnumProto<T extends string | number = string | number> {
   parse(value: any): T | undefined | null;
   default(def: T | (() => T)): this;
   transform(cb: import("../types").XanvTransformCallback<T>): this;
}
Object.assign(XVEnum.prototype as any, {} as XVEnumProto);
