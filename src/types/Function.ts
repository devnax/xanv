import { Infer } from "../types";
import XVType from "../XVType";

type Func<
  A extends XVType<any>[],
  R extends XVType<any>,
  Async extends boolean = false,
> = Async extends true
  ? (...args: { [K in keyof A]: Infer<A[K]> }) => Promise<Infer<R>>
  : (...args: { [K in keyof A]: Infer<A[K]> }) => Infer<R>;

export type XVFunctionOptions<
  A extends XVType<any>[],
  R extends XVType<any>,
> = {
  args: A;
  returns: R;
  async?: boolean;
};

class XVFunction<
  A extends XVType<any>[],
  R extends XVType<any>,
  Async extends boolean = false,
> extends XVType<Func<A, R, Async>> {
  readonly func_args: A;
  readonly func_return: R;
  readonly is_async: Async;

  constructor(options: XVFunctionOptions<A, R>) {
    super();

    this.func_args = options.args;
    this.func_return = options.returns;
    this.is_async = (options.async ?? false) as Async;
  }

  protected check(value: unknown): Func<A, R, Async> {
    if (typeof value !== "function") {
      throw new Error(`Value should be a function, received ${typeof value}`);
    }

    return value as Func<A, R, Async>;
  }

  parse(fn: unknown): Func<A, R, Async> {
    const checked = super.parse(fn);

    return ((...args: unknown[]) => {
      try {
        const parsedArgs = this.func_args.map((validator, i) =>
          validator.parse(args[i]),
        ) as { [K in keyof A]: Infer<A[K]> };

        const result = checked!(...parsedArgs);

        if (this.is_async) {
          if (!(result instanceof Promise)) {
            throw new Error(`Expected async function to return Promise`);
          }

          return result.then((res) => this.func_return.parse(res));
        }

        try {
          return this.func_return.parse(result);
        } catch (error) {
          throw new Error(`Function return value ${error}`);
        }
      } catch (error) {
        throw new Error(`Function args ${error}`);
      }
    }) as Func<A, R, Async>;
  }
}

export default XVFunction;
