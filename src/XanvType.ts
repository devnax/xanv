import { XanvTransformCallback, XVCheckCallback } from "./types";

abstract class XanvType<TypeKeys extends string | number | symbol, Default> {
   private checkes = new Map<TypeKeys, XVCheckCallback<Default>>();
   meta: Record<string, any> = {
      optional: false,
      nullable: false,
      default: undefined,
      transform: undefined,
   }

   protected abstract check(value: any): any;

   set(key: TypeKeys, check: XVCheckCallback<Default>) {
      this.checkes.set(key, check);
   }

   get(key: TypeKeys) {
      return this.checkes.get(key);
   }

   optional(): this {
      this.meta.optional = true;
      return this
   }

   default(value: Default): this {
      this.meta.default = value;
      return this
   }

   nullable(): this {
      this.meta.nullable = true;
      return this
   }

   transform(cb: XanvTransformCallback<any>) {
      this.meta.transform = cb
      return this
   }

   parse(value: any): Default | null {
      if (this.meta.nullable && value === null) {
         return null;
      }

      if (this.meta.default !== undefined && (value === undefined || value === null)) {
         return this.meta.default;
      }

      if (this.meta.optional && (value === undefined || value === null)) {
         return value;
      }

      value = this.check(value) || value;

      for (const [, check] of Array.from(this.checkes.entries())) {
         check(value);
      }

      if (this.meta.transform) {
         value = this.meta.transform(value);
      }

      return value;
   }
}

export default XanvType;