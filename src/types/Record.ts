import { Infer } from "../types";
import XVType from "../XVType";

class XVRecord<K extends XVType<any>, V extends XVType<any>> extends XVType<Record<Infer<K>, Infer<V>>> {
   constructor(readonly recordKey: K, readonly recordValue: V) {
      super();
   }

   protected check(value: any): Record<Infer<K>, Infer<V>> {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
         throw new Error(`Value should be a record, received ${typeof value}`);
      }

      for (const [k, v] of Object.entries(value)) {
         try {
            this.recordKey.parse(k);
            value[k] = this.recordValue.parse(v);
         } catch (error) {
            throw new Error(`Record entry '${k}' should have key of type ${this.recordKey.constructor.name} and value of type ${this.recordValue.constructor.name}, received key: ${typeof k}, value: ${typeof v}`);
         }
      }
      return value;
   }

}

export default XVRecord;