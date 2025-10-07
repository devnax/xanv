import XanvType from "../XanvType";
export type XVBooleanInfo = ""
class XVBoolean<T extends boolean = boolean> extends XanvType<XVBooleanInfo, T> {
   check(value: any): void {
      if (typeof value !== 'boolean') {
         throw new Error(`Value should be a boolean, received ${typeof value}`);
      }
   }
}

export default XVBoolean;

interface XVBooleanProto<T extends boolean = boolean> {
   parse(value: any): T | undefined | null;
   default(def: T | (() => T)): this;
   transform(cb: import("../types").XanvTransformCallback<T>): this;
}
Object.assign(XVBoolean.prototype as any, {} as XVBooleanProto);
