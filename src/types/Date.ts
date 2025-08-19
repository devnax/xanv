import XanvType from "../XanvType";
export type XVDateInfo = "";

class XVDate extends XanvType<XVDateInfo, Date> {
   check(value: Date): void {
      if (!(value instanceof Date) || isNaN(value.getTime())) {
         throw new Error(`Value should be a valid Date object, received ${typeof value}`);
      }
   }

}

export default XVDate;