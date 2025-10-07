import XanvType from "../XanvType";
import { XanvTransformCallback } from "../types";
export type XVAnyInfo = ""
class XVAny<T = any> extends XanvType<XVAnyInfo, T> {
   protected check(value: any) { }

   parse(value: any): T | undefined | null {
      return super.parse(value) as any;
   }

   default(def: T | (() => T)): this {
      return super.default(def as any);
   }

   transform(cb: XanvTransformCallback<T>) {
      return super.transform(cb as any);
   }
}

export default XVAny;