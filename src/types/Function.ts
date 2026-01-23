import { Infer } from "../types";
import XVType from "../XVType";

type Func<A extends XVType<any>[], R extends XVType<any>> = (...args: { [K in keyof A]: Infer<A[K]> }) => Infer<R>;

class XVFunction<A extends XVType<any>[], R extends XVType<any>> extends XVType<(...args: { [K in keyof A]: Infer<A[K]> }) => Infer<R>> {

   constructor(readonly args: A, readonly _return: R) {
      super();
   }

   protected check(value: unknown): Func<A, R> {
      if (typeof value !== "function") {
         throw new Error(`Value should be a function, received ${typeof value}`);
      }
      return value as Func<A, R>;
   }

   parse(fn: unknown): Func<A, R> {
      const checked = super.parse(fn) as Func<A, R>

      return ((...args: unknown[]) => {
         if (args.length !== this.args.length) {
            throw new Error(
               `Expected ${this.args.length} arguments, received ${args.length}`
            );
         }

         this.args.forEach((validator, i) => {
            validator.parse(args[i]);
         });

         const result = checked(...args as any);

         this._return.parse(result);

         return result;
      }) as Func<A, R>;
   }
}

export default XVFunction;
