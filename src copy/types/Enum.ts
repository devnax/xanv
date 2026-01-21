import XanvType from "../XanvType";

class XVEnum<T extends readonly (string | number)[]>
   extends XanvType<T[number]> // ⚡ Use union of array elements
{
   private readonly values: T;

   constructor(values: T) {
      super();

      if (!Array.isArray(values) || values.length === 0) {
         throw new Error("Enum values must be a non-empty array");
      }

      for (const v of values) {
         if (typeof v !== "string" && typeof v !== "number") {
            throw new Error("Enum values must be strings or numbers");
         }
      }

      this.values = values;
   }

   protected check(value: any): T[number] {
      if (!this.values.includes(value)) {
         throw new Error(
            `Value should be one of: ${this.values.join(", ")}`
         );
      }
      return value as T[number];
   }
}

export default XVEnum;
