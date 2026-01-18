import { Infer, XVInstanceType } from "../types";
import XanvType from "../XanvType";

class XVMap<K extends XVInstanceType = any, V extends XVInstanceType = any> extends XanvType<Map<Infer<K>, Infer<V>>, unknown> {
   private keySchema: K;
   private valueSchema: V;

   constructor(key: K, value: V) {
      super();
      this.keySchema = key;
      this.valueSchema = value;
   }

   protected check(value: unknown): Map<Infer<K>, Infer<V>> {
      if (!(value instanceof Map)) {
         throw new Error(`Value should be a Map, received ${typeof value}`);
      }

      const result = new Map<Infer<K>, Infer<V>>();

      for (const [k, v] of (value as any).entries()) {
         try {
            const parsedKey = this.keySchema.parse(k) as Infer<K>;
            const parsedValue = this.valueSchema.parse(v) as Infer<V>;
            result.set(parsedKey, parsedValue);
         } catch (err) {
            throw new Error(
               `Map entry should have key of type ${this.keySchema.constructor.name} and value of type ${this.valueSchema.constructor.name}, received key: ${typeof k}, value: ${typeof v}`
            );
         }
      }

      return result;
   }
}

export default XVMap;
