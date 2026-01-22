import XVType from "../XVType";
import { Infer } from "../types";

export type XVObjectShape = Record<string, XVType<any>>;

class XVObject<const T extends XVObjectShape> extends XVType<{ [K in keyof T]: Infer<T[K]> }> {
   constructor(private readonly arg: T) {
      super();
   }

   protected check(value: unknown): { [K in keyof T]: Infer<T[K]> } {
      if (typeof value !== "object" || value === null) {
         throw new Error("Value must be an object");
      }

      const result = {} as { [K in keyof T]: Infer<T[K]> };

      for (const key in this.arg) {
         const itemType = this.arg[key];
         result[key] = itemType.parse((value as any)[key]);
      }

      return result;
   }
}

export default XVObject;
