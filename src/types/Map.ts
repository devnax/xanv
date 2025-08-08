import { XVInstanceType } from "../types";
import XanvType from "../XanvType";

export type XVMapInfo = "";

class XVMap extends XanvType<XVMapInfo, Map<any, any>> {
   name: string = 'XanvMap';
   private key: XVInstanceType;
   private value: XVInstanceType;

   constructor(key: XVInstanceType, value: XVInstanceType) {
      super();
      this.key = key;
      this.value = value;
   }

   check(value: any) {
      if (!(value instanceof Map)) {
         throw new Error(`Value should be a Map, received ${typeof value}`);
      }

      for (const [k, v] of Array.from(value.entries())) {
         try {
            this.key.parse(k);
            this.value.parse(v);
            value.set(k, this.value.parse(v));
         } catch (error) {
            throw new Error(`Map entry should have key of type ${this.key.name} and value of type ${this.value.name}, received key: ${typeof k}, value: ${typeof v}`);
         }
      }

      return value;
   }


}

export default XVMap;