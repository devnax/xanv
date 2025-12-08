import XanvType from "../XanvType";

class XVBoolean extends XanvType<boolean> {
   protected check(value: any): void {
      if (typeof value !== 'boolean') {
         throw new Error(`Value should be a boolean, received ${typeof value}`);
      }
   }
}

export default XVBoolean;