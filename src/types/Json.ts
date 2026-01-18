import XanvType from "../XanvType";

class XVJson<T extends Record<string, any> = Record<string, any>> extends XanvType<T, unknown> {
   name: string = "XanvJson";

   protected check(value: unknown): T {
      if (typeof value !== "object" || value === null || Array.isArray(value)) {
         throw new Error("Value is not a valid JSON object");
      }
      return value as T;
   }
}

export default XVJson;
