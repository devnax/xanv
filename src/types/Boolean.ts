import XanType, { XanTypeTypes } from "./Type";

export type XanBooleanInfo = ""

class XanBoolean extends XanType<XanBooleanInfo, boolean> {
   protected type: XanTypeTypes = 'boolean';

   check(value: boolean): void {
      if (typeof value !== 'boolean') {
         throw new Error(`Value should be a boolean, received ${typeof value}`);
      }
   }
}

export default XanBoolean;