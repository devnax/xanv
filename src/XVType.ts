import { XVCheckCallback, XVDefaultValue, XVMeta, XVTransformCallback } from "./types";

abstract class XVType<T> {
   readonly _type!: T
   private checks: XVCheckCallback<T>[] = [];
   private transforms: XVTransformCallback<T>[] = [];
   readonly meta: XVMeta<T> = {};
   protected abstract check(value: unknown): T;

   protected set(method: string, check: XVCheckCallback<T>, args: any = true): this {
      if (!(method in this)) {
         throw new Error(`Method ${method} does not exist on ${this.constructor.name}`);
      }
      this.checks.push(check);
      this.meta[method] = args;
      return this;
   }

   clone(): this {
      const cloned = Object.create(this);
      cloned.checks = [...this.checks];
      cloned.meta = { ...this.meta };
      cloned.transforms = [...this.transforms];
      return cloned;
   }

   optional(): this {
      return this.set("optional", () => { })
   }

   nullable(): this {
      return this.set("nullable", () => { })
   }

   default(value: XVDefaultValue<T>): this {
      return this.set("default", () => { }, value)
   }

   transform(cb: XVTransformCallback<T>): this {
      this.transforms.push(cb);
      return this
   }

   parse(value: unknown): T | undefined | null {
      // default
      if (this.meta.default !== undefined && (value === undefined || value === null)) {
         value = typeof this.meta.default === "function" ? (this.meta.default as () => T)() : this.meta.default;
      }

      // optional / nullable
      if (this.meta.optional && value === undefined) return undefined;
      if (this.meta.nullable && value === null) return null;

      // run internal check
      let result = this.check(value)

      // run user checks
      for (const check of this.checks) {
         check(result);
      }

      // run transforms
      for (const transform of this.transforms) {
         result = transform(result);
      }

      return result;
   }
}

export default XVType;
