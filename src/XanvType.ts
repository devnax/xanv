export type XanvTransformCallback<T, U = T> = (value: T) => U;
export type XVCheckCallback<T> = (value: unknown) => void;

export type Meta = {
   optional?: boolean;
   nullable?: boolean;
   default?: any;
};

abstract class XanvType<Value, Input = unknown> {
   private checks: XVCheckCallback<Value>[] = [];
   private transforms: XanvTransformCallback<any, any>[] = [];
   readonly meta: Meta = {};

   protected abstract check(value: Input): Value;

   protected set(methodName: string, check: XVCheckCallback<Value>, args: any = true): this {
      if (!(methodName in this)) {
         throw new Error(
            `Method ${methodName} does not exist on ${this.constructor.name}`
         );
      }
      this.checks.push(check);
      (this as any).meta[methodName] = args;
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

   default(value: Value | (() => Value)): this {
      return this.set("default", () => { }, value)
   }

   transform<T>(cb: XanvTransformCallback<Value, T>): this {
      this.transforms.push(cb);
      return this
   }

   parse(value: Input): Value | undefined | null {
      // default
      if (this.meta.default !== undefined && (value === undefined || value === null)) {
         value = typeof this.meta.default === "function" ? this.meta.default() : this.meta.default;
      }

      // optional / nullable
      if (this.meta.optional && value === undefined) return undefined;
      if (this.meta.nullable && value === null) return null;

      // run internal check
      let result = this.check(value);

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

export default XanvType;
