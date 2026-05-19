import { Infer } from "../types";
import XVType from "../XVType";

/**
 * Function component type (sync + async)
 */
type FuncComponent<P, Async extends boolean = false> = Async extends true
  ? (props: P) => Promise<any>
  : (props: P) => any;

/**
 * Convert schema props → runtime props
 */
type InferProps<P extends Record<string, XVType<any>>> = {
  [K in keyof P]: Infer<P[K]>;
};

class XVFunctionComponent<
  P extends Record<string, XVType<any>>,
  Async extends boolean = false,
> extends XVType<FuncComponent<InferProps<P>, Async>> {
  readonly props: P;
  readonly is_async: Async;

  constructor(props: P, async?: Async) {
    super();
    this.props = props;
    this.is_async = (async ?? false) as Async;
  }

  protected check(value: unknown): any {
    if (typeof value !== "function") {
      throw new Error("Component must be a function");
    }
    return value;
  }

  parse(fn: unknown) {
    const checked = super.parse(fn);

    if (this.meta.optional && !checked) {
      return;
    }
    if (this.meta.nullable && !checked) {
      return null;
    }

    return ((inputProps: InferProps<P>) => {
      const parsed: InferProps<P> = {} as InferProps<P>;

      for (const key in this.props) {
        parsed[key] = this.props[key].parse((inputProps as any)[key]);
      }

      const result = (checked as any)(parsed);

      if (this.is_async) {
        return Promise.resolve(result);
      }

      return result;
    }) as FuncComponent<InferProps<P>, Async>;
  }
}

export default XVFunctionComponent;
