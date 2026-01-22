import { Infer } from "../types";
import XVType from "../XVType";

class XVUnion<T extends XVType<any>[] = XVType<any>[]> extends XVType<Infer<T[number]>> {

   constructor(private types: T) {
      super();
      if (!Array.isArray(types) || types.length === 0) {
         throw new Error("Union types must be a non-empty array");
      }
   }

   protected check(value: unknown): Infer<T[number]> {
      let lastError: any = null;

      for (const type of this.types) {
         try {
            return type.parse(value); // parse each type
         } catch (err) {
            lastError = err;
         }
      }

      throw new Error(
         `Value does not match any of the union types: ${this.types
            .map((t) => t.constructor.name)
            .join(", ")}. Last error: ${lastError?.message || lastError}`
      );
   }
}

export default XVUnion;
