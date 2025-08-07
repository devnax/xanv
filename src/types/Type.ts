export type XanTypeInfoProp = "type" | "nullable" | "optional" | 'default'
export type CheckCallback<T> = (value: T) => boolean;
export type MessageCallback<T> = (value: T) => string;
export type XanTypeInfoObject<Default> = {
   check: CheckCallback<Default>;
   message: MessageCallback<Default> | string;
   default?: Default;
}
export type XanTypeErrorObject<T> = {
   key: T | XanTypeInfoProp;
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
   | "union"


abstract class XanType<Xaninfo, Default> {
   protected abstract type: XanTypeTypes;
   private info = new Map<Xaninfo | XanTypeInfoProp, XanTypeInfoObject<Default>>();
   private errors = new Map<Xaninfo | XanTypeInfoProp, XanTypeErrorObject<Xaninfo>>();

   set(key: Xaninfo | XanTypeInfoProp, info: XanTypeInfoObject<Default>) {
      this.info.set(key, info);
   }

   get(key: Xaninfo | XanTypeInfoProp) {
      return this.info.get(key);
   }

   optional(): this {
      this.set('optional', {
         check: (v: any) => v === undefined || v === null || v === '',
         message: ''
      });
      return this
   }

   default(value: Default): this {
      this.set('default', {
         check: (v: any) => v === undefined || v === null || v === '',
         default: value,
         message: ``
      });
      return this
   }

   nullable(): this {
      this.set('nullable', {
         check: (v: any) => v === null,
         message: `Value should be null`
      });
      return this
   }

   parse(value: any): any {
      this.errors.clear();
      if (this.get('nullable')?.check(value)) {
         return null;
      }

      const _def = this.get('default')
      if (_def && _def.check(value)) {
         return _def.default;
      }

      if (this.get('optional')?.check(value)) {
         return value;
      }



      if (value === undefined || value === null) {
         throw new Error(`Value cannot be undefined or null`);
      }

      for (let [key, info] of Array.from(this.info.entries())) {

         if (key === 'default' || key === 'optional' || key === 'nullable') {
            continue;
         }

         if (!info.check(value)) {
            console.log(`Validation failed for ${key}:`, value);

            this.errors.set(key, {
               key: key,
               message: typeof info.message === 'function' ? info.message(value) : info.message
            });
         }
      }


      if (this.errors.size > 0) {
         throw new Error(`Validation failed: ${Array.from(this.errors.values()).map(e => e.message).join(', ')}`);
      }
      return value;
   }

}

export default XanType;