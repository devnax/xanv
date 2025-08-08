export type CheckCallback<T> = (value: T) => void;
export type XanTypeErrorObject<T> = {
   key: T;
   message: string;
}

export type XanTypeTypes =
   | "array"
   | "boolean"
   | "date"
   | "enum"
   | "map"
   | "number"
   | "record"
   | "object"
   | "set"
   | "string"
   | "tuple"
   | "union";


abstract class XanType<TypeKeys extends string | number | symbol, Default> {
   protected abstract type: XanTypeTypes;
   private checkes = new Map<TypeKeys, CheckCallback<Default>>();
   private _def = {
      optional: false,
      nullable: false,
      default: undefined as Default | undefined
   }

   protected abstract check(value: Default): void;

   set(key: TypeKeys, check: CheckCallback<Default>) {
      this.checkes.set(key, check);
   }

   get(key: TypeKeys) {
      return this.checkes.get(key);
   }

   optional(): this {
      this._def.optional = true;
      return this
   }

   default(value: Default): this {
      this._def.default = value;
      return this
   }

   nullable(): this {
      this._def.nullable = true;
      return this
   }

   parse(value: any): any {
      if (this._def.nullable && value === null) {
         return null;
      }

      if (this._def.default !== undefined && (value === undefined || value === null)) {
         return this._def.default;
      }

      if (this._def.optional && (value === undefined || value === null)) {
         return value;
      }

      this.check(value);

      for (const [, check] of Array.from(this.checkes.entries())) {
         check(value);
      }

      return value;
   }

}

export default XanType;