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

   set(key: TypeKeys, check: XVCheckCallback<Default>, args?: any): void {
      this.checkes.set(key, check);
      (this.meta as any)[key] = args || true; // Store the key in meta for reference
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
      if (value === undefined || value === null) {
         if (this.meta.nullable && value === null) {
            return this.meta.default || null;
         }
         if (this.meta.optional) {
            return this.meta.default;
         }
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