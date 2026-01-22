import XVType from "../XVType";

class XVAny<T = any> extends XVType<T> {
   protected check(value: any): any {
      return value;
   }
}

export default XVAny;
