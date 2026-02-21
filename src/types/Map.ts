import { Infer } from "../types";
import XVType from "../XVType";

class XVMap<K extends XVType<any> = any, V extends XVType<any> = any> extends XVType<Map<Infer<K>, Infer<V>>> {
   constructor(readonly Mapkey: K, readonly Mapvalue: V) {
      super();
   }

   protected check(value: unknown): Map<Infer<K>, Infer<V>> {
      if (!(value instanceof Map)) {
         throw new Error(`Value should be a Map, received ${typeof value}`);
      }

      const result = new Map<Infer<K>, Infer<V>>();

      for (const [k, v] of (value as any).entries()) {
         try {
            const parsedKey = this.Mapkey.parse(k) as Infer<K>;
            const parsedValue = this.Mapvalue.parse(v) as Infer<V>;
            result.set(parsedKey, parsedValue);
         } catch (err) {
            throw new Error(
               `Map entry should have key of type ${this.Mapkey.constructor.name} and value of type ${this.Mapvalue.constructor.name}, received key: ${typeof k}, value: ${typeof v}`
            );
         }
      }

      return result;
   }
}

export default XVMap;
