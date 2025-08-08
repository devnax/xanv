import XanBase, { XanBaseTypes } from "./XanBase";

export type XanEnumInfo = "";

class XanEnum extends XanBase<XanEnumInfo, "enum"> {
   protected type: XanBaseTypes = 'enum';
   private enumValues: string[];

   constructor(values: string[]) {
      super();
      if (!Array.isArray(values) || values.length === 0) {
         throw new Error("Enum values must be a non-empty array");
      }
      this.enumValues = values;
   }

   check(value: any): void {
      if (typeof value !== 'string') {
         throw new Error(`Value should be a string, received ${typeof value}`);
      }

      if (!this.enumValues.includes(value)) {
         throw new Error(`Value should be one of the enum values: ${this.enumValues.join(', ')}`);
      }
   }

}

export default XanEnum;