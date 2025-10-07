import XanvType from "../XanvType";
export type XVDateInfo = "";

class XVDate<T extends Date = Date> extends XanvType<XVDateInfo, T> {
   check(value: any): void {
      if (!(value instanceof Date) || isNaN(value.getTime())) {
         throw new Error(`Value should be a valid Date object, received ${typeof value}`);
      }
   }

}

export default XVDate;

interface XVDateProto<T extends Date = Date> {
   parse(value: any): T | undefined | null;
   default(def: T | (() => T)): this;
   transform(cb: import("../types").XanvTransformCallback<T>): this;
}
Object.assign(XVDate.prototype as any, {} as XVDateProto);