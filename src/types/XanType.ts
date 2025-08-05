export type XanTypeInfoProp = "optional"
export type XanTypeInfoObject = {
   check: (value: any) => boolean;
   message: string;
}

abstract class XanType<Xaninfo> {
   protected _type: string = '';
   protected _info = new Map<Xaninfo | XanTypeInfoProp, XanTypeInfoObject>();

   optional(): this {
      this._info.set('optional', {
         check: (v: any) => v === undefined || v === null || v === '',
         message: ''
      });
      return this
   }

   validate(value: any): boolean {
      let isValid = true;
      for (let [key, info] of Array.from(this._info.entries())) {
         if (key === 'optional' && info.check(value)) {
            return true; // If optional and value is not provided, skip validation
         }

         if (!info.check(value)) {
            console.error(info.message);
            isValid = false;
         }
      }
      return isValid;
   }
}

export default XanType;