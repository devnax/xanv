import XanvType from "../XanvType";

class XVDate<T extends Date = Date> extends XanvType<T> {
   protected check(value: any): void {
      if (!(value instanceof Date) || isNaN(value.getTime())) {
         throw new Error(`Value should be a valid Date object, received ${typeof value}`);
      }
   }

}

export default XVDate;