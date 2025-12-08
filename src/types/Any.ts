import XanvType from "../XanvType";

class XVAny<T = any> extends XanvType<T> {
   protected check() { }

   parse(value: any): T | undefined | null {
      return super.parse(value) as any;
   }
}

export default XVAny;