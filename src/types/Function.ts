import { Infer, XVInstanceType } from "../types";
import XanvType from "../XanvType";

type Func<A extends XVInstanceType[], R extends XVInstanceType> =
   (...args: { [K in keyof A]: Infer<A[K]> }) => Infer<R>;

class XVFunction<A extends XVInstanceType[], R extends XVInstanceType>
   extends XanvType<Func<A, R>, unknown> {

   private _args: A;
   private _return: R;

   constructor(args: A, ret: R) {
      super();
      this._args = args;
      this._return = ret;
   }

   protected check(value: any): Func<A, R> {
      if (typeof value !== "function") {
         throw new Error(`Value should be a function, received ${typeof value}`);
      }
      return value;
   }

   parse(fn: any): Func<A, R> {
      super.parse(fn);

      return ((...args: any[]) => {
         // Validate each argument
         this._args.forEach((argValidator, i) => {
            argValidator.parse(args[i]);
         });

         const result = fn(...args);

         // Validate return value
         this._return.parse(result);

         return result;
      }) as Func<A, R>;
   }
}

export default XVFunction;
