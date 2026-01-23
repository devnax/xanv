import XVType from "../XVType";

export type EnumLike<T extends string | number> = Record<string, T>;

class XVEnum<T extends string | number> extends XVType<T> {
   readonly options: T[];

   constructor(input: readonly T[] | EnumLike<T>) {
      super();

      this.options = Array.isArray(input)
         ? [...input]
         : Object.values(input);

      if (this.options.length === 0) {
         throw new Error("Enum options must be non-empty");
      }
   }

   protected check(value: unknown): T {
      if (!this.options.includes(value as T)) {
         throw new Error(`Value should be one of: ${this.options.join(", ")}`);
      }
      return value as T;
   }
}

export default XVEnum;
