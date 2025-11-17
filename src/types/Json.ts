import XanvType from "../XanvType";

class XVJson extends XanvType<any, object> {
   name: string = 'XanvJson';
   check(value: any): void {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
         throw new Error("Value is not a valid JSON object");
      }
   }
}

export default XVJson;

interface XVJsonProto<K extends string = string, V = any> {
   parse(value: any): Record<K, V> | undefined | null;
   default(def: Record<K, V> | (() => Record<K, V>)): this;
   transform(cb: import("../types").XanvTransformCallback<Record<K, V>>): this;
}
Object.assign(XVJson.prototype as any, {} as XVJsonProto);