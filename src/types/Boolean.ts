import XanvType from "../XanvType";
export type XVBooleanInfo = ""
class XVBoolean extends XanvType<XVBooleanInfo, boolean> {
   name: string = 'XanvBoolean';

   check(value: boolean): void {
      if (typeof value !== 'boolean') {
         throw new Error(`Value should be a boolean, received ${typeof value}`);
      }
   }
}

export default XVBoolean;