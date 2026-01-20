import XanvType from "../XanvType";
import { XVInstanceType, Infer } from "../types";

class XVPromise<T extends XVInstanceType> extends XanvType<Promise<Infer<T>>, unknown> {
   private _inner: T;

   constructor(inner: T) {
      super();
      this._inner = inner;
   }

   protected check(value: any): Promise<Infer<T>> {
      if (!(value instanceof Promise)) {
         throw new Error(`Value should be a Promise, received ${typeof value}`);
      }
      return value;
   }

   parse(value: any): Promise<Infer<T>> {
      super.parse(value);

      // Wrap the promise so the resolved value is validated
      return (value as Promise<any>).then((res) => {
         if (this._inner) {
            this._inner.parse(res);
         }
         return res;
      });
   }
}

export default XVPromise;
