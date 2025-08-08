import XanBase, { XanBaseTypes } from "./XanBase";

export type XanDateInfo = "";

class XanDate extends XanBase<XanDateInfo, Date> {
   protected type: XanBaseTypes = 'date';

   check(value: Date): void {
      if (!(value instanceof Date) || isNaN(value.getTime())) {
         throw new Error(`Value should be a valid Date object, received ${typeof value}`);
      }
   }

}

export default XanDate;