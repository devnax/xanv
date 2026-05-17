import XVType from "../XVType";
import { Infer } from "../types";

export type XVObjectShape = Record<string | number, XVType<any>>;

class XVObject<const T extends XVObjectShape> extends XVType<Infer<T>> {
  constructor(readonly objectArg: T) {
    super();
  }

  protected check(value: unknown): Infer<T> {
    if (typeof value !== "object" || value === null) {
      throw new Error("Value must be an object");
    }

    const result = {} as Infer<T>;

    for (const key in this.objectArg) {
      const itemType = this.objectArg[key];
      result[key] = itemType.parse((value as any)[key]);
    }

    return result;
  }
}

export default XVObject;
