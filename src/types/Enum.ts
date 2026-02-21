import XVType from "../XVType";

export type EnumLike<T extends string | number> = Record<string, T>;

class XVEnum<T extends string | number> extends XVType<T> {
   readonly enum_options: T[];

   constructor(input: readonly T[] | EnumLike<T>) {
      super();

      this.enum_options = Array.isArray(input)
         ? [...input]
         : Object.values(input);

      if (this.enum_options.length === 0) {
         throw new Error("Enum options must be non-empty");
      }
   }

   protected check(value: unknown): T {
      if (!this.enum_options.includes(value as T)) {
         throw new Error(`Value should be one of: ${this.enum_options.join(", ")}`);
      }
      return value as T;
   }
}

export default XVEnum;
