import { Infer } from "../types";
import XVType from "../XVType";

class XVMap<K extends XVType<any> = any, V extends XVType<any> = any> extends XVType<Map<Infer<K>, Infer<V>>> {
   constructor(private key: K, private value: V) {
      super();
   }

   protected check(value: unknown): Map<Infer<K>, Infer<V>> {
      if (!(value instanceof Map)) {
         throw new Error(`Value should be a Map, received ${typeof value}`);
      }

      const result = new Map<Infer<K>, Infer<V>>();

      for (const [k, v] of (value as any).entries()) {
         try {
            const parsedKey = this.key.parse(k) as Infer<K>;
            const parsedValue = this.value.parse(v) as Infer<V>;
            result.set(parsedKey, parsedValue);
         } catch (err) {
            throw new Error(
               `Map entry should have key of type ${this.key.constructor.name} and value of type ${this.value.constructor.name}, received key: ${typeof k}, value: ${typeof v}`
            );
         }
      }

      return result;
   }
}

export default XVMap;
