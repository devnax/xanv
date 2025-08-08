import { XanvInstanceType } from "./types";
import XanBase, { XanBaseTypes } from "./XanBase";

export type XanRecordInfo = "";

class XanRecord extends XanBase<XanRecordInfo, "record"> {
   protected type: XanBaseTypes = 'record';
   private key: XanvInstanceType;
   private value: XanvInstanceType;

   constructor(key: XanvInstanceType, value: XanvInstanceType) {
      super();
      this.key = key;
      this.value = value;
   }

   check(value: any): void {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
         throw new Error(`Value should be a record, received ${typeof value}`);
      }

      for (const [k, v] of Object.entries(value)) {
         this.key.parse(k);
         this.value.parse(v);
      }
   }

}

export default XanRecord;