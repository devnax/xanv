import { XVInstanceType } from "../types";
import XanvType from "../XanvType";

class XVUnion<T extends XVInstanceType[] = XVInstanceType[]> extends XanvType<unknown> {
   private types: T;

   constructor(types: T) {
      super();
      if (!Array.isArray(types) || types.length === 0) {
         throw new Error("Union types must be a non-empty array");
      }
      this.types = types;
   }

   protected check(value: unknown): unknown {
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

   parse(value: unknown) {
      // return the base parse value
      return super.parse(value); // cast outside when using Infer if needed
   }
}

export default XVUnion;
