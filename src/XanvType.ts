import { XanvTransformCallback, XVCheckCallback } from "./types";

abstract class XanvType<Value = any> {
   private checkes = new Map<string, XVCheckCallback<Value>>();
   private transforms: XanvTransformCallback<Value>[] = []
   readonly meta: Record<string, any> = {}
   protected abstract check(value: any): any;

   protected set(methodName: string, check: XVCheckCallback<Value>, args: any = true) {
      const has = methodName in this
      if (!has) {
         throw new Error(`Method ${methodName} does not exist on ${this.constructor.name}`);
      }
      this.checkes.set(methodName, check);
      this.meta[methodName] = args
      return this
   }

   clone() {
      const cloned = Object.create(this);
      cloned.checkes = new Map(this.checkes);
      cloned.meta = { ...this.meta };
      cloned.transforms = [...this.transforms];
      return cloned;
   }

   optional() {
      return this.set('optional', () => { }, true);
   }

   default(value: Value | (() => Value)) {
      return this.set('default', () => { }, value);
   }

   nullable() {
      return this.set('nullable', () => { }, true);
   }

   transform(cb: XanvTransformCallback<Value>) {
      this.transforms.push(cb);
   }

   parse(value: any): Value | undefined | null {

      if (this.meta.default && (value === undefined || value === null)) {
         value = typeof this.meta.default === 'function' ? this.meta.default() : this.meta.default
      }

      if (this.meta.optional && value === undefined) {
         return value;
      }

      if (this.meta.nullable && value === null) {
         return value;
      }

      value = this.check(value) || value;

      for (const [, check] of Array.from(this.checkes.entries())) {
         check(value);
      }

      for (const transform of this.transforms) {
         value = transform(value);
      }

      return value;
   }
}

export default XanvType;