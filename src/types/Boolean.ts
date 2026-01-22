import XVType from "../XVType";

class XVBoolean extends XVType<boolean> {
   protected check(value: unknown): boolean {
      if (typeof value !== "boolean") {
         throw new Error(`Value should be a boolean, received ${typeof value}`);
      }
      return value;
   }
}

export default XVBoolean;
