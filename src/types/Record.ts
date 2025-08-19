import { XVInstanceType, XVObjectType } from "../types";
import XanvType from "../XanvType";

export type XVRecordInfo = "";

class XVRecord extends XanvType<XVRecordInfo, XVObjectType> {
   name: string = 'XanvRecord';
   private key: XVInstanceType;
   private value: XVInstanceType;

   constructor(key: XVInstanceType, value: XVInstanceType) {
      super();
      this.key = key;
      this.value = value;
   }

   check(value: any): void {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
         throw new Error(`Value should be a record, received ${typeof value}`);
      }

      for (const [k, v] of Object.entries(value)) {
         try {
            this.key.parse(k);
            this.value.parse(v);
            value[k] = this.value.parse(v);
         } catch (error) {
            throw new Error(`Record entry '${k}' should have key of type ${this.key.constructor.name} and value of type ${this.value.constructor.name}, received key: ${typeof k}, value: ${typeof v}`);
         }
      }
      return value;
   }

}

export default XVRecord;