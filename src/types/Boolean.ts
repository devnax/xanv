import XanBase, { XanBaseTypes } from "./XanBase";

export type XanBooleanInfo = ""

class XanBoolean extends XanBase<XanBooleanInfo, boolean> {
   protected type: XanBaseTypes = 'boolean';

   check(value: boolean): void {
      if (typeof value !== 'boolean') {
         throw new Error(`Value should be a boolean, received ${typeof value}`);
      }
   }
}

export default XanBoolean;