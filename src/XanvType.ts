import { XanvTransformCallback, XVCheckCallback } from "./types";

abstract class XanvType<TypeKeys extends string | number | symbol, Default> {
   private checkes = new Map<TypeKeys, XVCheckCallback<Default>>();
   readonly meta: Record<string, any> = {
      optional: false,
      nullable: false,
      default: undefined,
      transform: undefined,
   }

   protected abstract check(value: any): any;

   clone(): this {
      const cloned = Object.create(this);
      cloned.checkes = new Map(this.checkes);
      cloned.meta = { ...this.meta };
      return cloned;
   }

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

   default(def: Default | (() => Default)): this {
      this.meta.default = def;
      return this
   }

   nullable(): this {
      this.meta.nullable = true;
      return this
   }

   transform(cb: XanvTransformCallback<Default>) {
      this.meta.transform = cb
      return this
   }

   parse(value: any): Default | undefined | null {

      if ((value === undefined || value === null) && this.meta.default !== undefined) {
         value = typeof this.meta.default === 'function' ? this.meta.default() : this.meta.default
      }

      if ((this.meta.nullable || this.meta.optional) && (value === undefined || value === null)) {
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