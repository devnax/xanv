import XanvType from "../XanvType";
export type XVAnyInfo = ""
class XVAny extends XanvType<XVAnyInfo, boolean> {
   name: string = 'XVAny';
   protected check(value: any) {
   }
}

export default XVAny;