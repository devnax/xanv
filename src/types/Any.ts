import XanvType from "../XanvType";

class XVAny extends XanvType<any, any> {
   protected check(value: any): any {
      // Accept any value as-is
      return value;
   }

   parse(value: any): any | undefined | null {
      return super.parse(value);
   }
}

export default XVAny;
