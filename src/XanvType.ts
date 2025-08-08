import { XanvTransformCallback, XVCheckCallback } from "./types";

abstract class XanvType<TypeKeys extends string | number | symbol, Default> {
   private checkes = new Map<TypeKeys, XVCheckCallback<Default>>();
   private _def: any = {
      optional: false,
      nullable: false,
      default: undefined as Default | undefined,
      transform: undefined as XanvTransformCallback<Default> | undefined,
   }
   abstract name: string;
   protected abstract check(value: any): any;

   set(key: TypeKeys, check: XVCheckCallback<Default>) {
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

   transform(cb: XanvTransformCallback<any>) {
      this._def.transform = cb
   }

   parse(value: any): Default | null {
      if (this._def.nullable && value === null) {
         return null;
      }

      if (this._def.default !== undefined && (value === undefined || value === null)) {
         return this._def.default;
      }

      if (this._def.optional && (value === undefined || value === null)) {
         return value;
      }

      value = this.check(value) || value;

      for (const [, check] of Array.from(this.checkes.entries())) {
         check(value);
      }

      if (this._def.transform) {
         value = this._def.transform(value);
      }

      return value;
   }
}

export default XanvType;