import XanType, { XanTypeTypes } from "./Type";

export type XanBooleanInfo = ""

class XanBoolean extends XanType<XanBooleanInfo, boolean> {
   protected type: XanTypeTypes = 'boolean';

   constructor() {
      super();
      this.set("type", {
         check: (v: any) => typeof v === 'boolean',
         message: `Value should be a boolean`
      });
   }

}

export default XanBoolean;