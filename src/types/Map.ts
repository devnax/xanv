import { XanvInstanceType } from "./types";
import XanBase, { XanBaseTypes } from "./XanBase";

export type XanMapInfo = "";

class XanMap extends XanBase<XanMapInfo, "Map"> {
   protected type: XanBaseTypes = 'map';
   private key: XanvInstanceType;
   private value: XanvInstanceType;

   constructor(key: XanvInstanceType, value: XanvInstanceType) {
      super();
      this.key = key;
      this.value = value;
   }

   check(value: any): void {
      if (!(value instanceof Map)) {
         throw new Error(`Value should be a Map, received ${typeof value}`);
      }

      for (const [k, v] of Array.from(value.entries())) {
         this.key.parse(k);
         this.value.parse(v);
      }
   }

}

export default XanMap;