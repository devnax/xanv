export type XanTypeInfoProp = "optional" | 'default'
export type XanTypeInfoObject<Default> = {
   check: (value: any) => boolean;
   message: string;
   default?: Default
}
export type XanTypeErrorObject<T> = {
   key: T | XanTypeInfoProp;
   message: string;
}

abstract class XanType<Xaninfo, Default> {
   protected _type: string = '';
   protected _info = new Map<Xaninfo | XanTypeInfoProp, XanTypeInfoObject<Default>>();
   private _errors = new Map<Xaninfo | XanTypeInfoProp, XanTypeErrorObject<Xaninfo>>();

   optional(): this {
      this._info.set('optional', {
         check: (v: any) => v === undefined || v === null || v === '',
         message: ''
      });
      return this
   }

   default(value: Default): this {
      this._info.set('default', {
         check: (v: any) => v !== undefined && v !== null,
         message: 'This field is required',
         default: value
      });
      return this
   }

   parse(value: any): any {
      this._errors.clear();
      const _def = this._info.get('default');
      if (_def && !_def.check(value)) {
         return _def.default;
      }
      if (this._info.has('optional') && this._info.get('optional')?.check(value)) {
         return value;
      }
      for (let [key, info] of Array.from(this._info.entries())) {
         if (!info.check(value)) {
            this._errors.set(key, {
               key: key,
               message: info.message
            });
         }
      }
      if (this._errors.size > 0) {
         throw new Error(`Validation failed: ${Array.from(this._errors.values()).map(e => e.message).join(', ')}`);
      }
      return value;
   }

}

export default XanType;