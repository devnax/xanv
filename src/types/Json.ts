import XanvType from "../XanvType";

class XVJson extends XanvType<object> {
   name: string = 'XanvJson';
   protected check(value: any): void {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
         throw new Error("Value is not a valid JSON object");
      }
   }
}

export default XVJson;