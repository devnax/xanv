import XVType from "../XVType";
import { Infer } from "../types";

class XVPromise<T extends XVType<any>> extends XVType<Promise<Infer<T>>> {
   constructor(readonly inner: T) {
      super();
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
         if (this.inner) {
            this.inner.parse(res);
         }
         return res;
      });
   }
}

export default XVPromise;
