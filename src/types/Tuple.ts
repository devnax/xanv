import { Infer } from "../types";
import XVType from "../XVType";

class XVTuple<T extends XVType<any>[] = any> extends XVType<{ [K in keyof T]: Infer<T[K]> }> {

   constructor(readonly types: T) {
      super();
   }

   protected check(value: unknown): { [K in keyof T]: Infer<T[K]> } {
      if (!Array.isArray(value)) {
         throw new Error(`Value should be a tuple, received ${typeof value}`);
      }

      if (value.length !== this.types.length) {
         throw new Error(`Tuple length should be ${this.types.length}, received ${value.length}`);
      }

      const result = [] as unknown as { [K in keyof T]: Infer<T[K]> };

      for (let i = 0; i < value.length; i++) {
         try {
            result[i] = this.types[i].parse(value[i]) as Infer<T[typeof i]>;
         } catch (err: any) {
            throw new Error(
               `Tuple item at index ${i} should be of type ${this.types[i].constructor.name}, received ${typeof value[i]}`
            );
         }
      }

      return result;
   }
}

export default XVTuple;
