import XVType from "./XVType"

// value-level inference
export type InferValue<T extends XVType<any>> =
   T extends XVType<infer R>
   ? (T["meta"] extends { nullable: true } ? R | null : R)
   : never

// optional field detection
export type IsOptional<T extends XVType<any>> =
   T["meta"] extends { optional: true } ? true :
   T["meta"] extends { default: any } ? true :
   false

// object schema inference
export type InferObject<T extends Record<string, XVType<any>>> =
   { [K in keyof T as IsOptional<T[K]> extends true ? never : K]:
      InferValue<T[K]>
   } & {
      [K in keyof T as IsOptional<T[K]> extends true ? K : never]?:
      InferValue<T[K]>
   }

// 🔥 THIS is what you use
type Simplify<T> = T extends object ? { [K in keyof T]: T[K] } : T

export type Infer<T> =
   T extends XVType<any> ? InferValue<T> :
   T extends Record<string, XVType<any>> ? Simplify<InferObject<T>> :
   never

export type XVCheckCallback<T> = (value: unknown) => T | void
export type XVDefaultValue<T> = T | (() => T)
export type XVTransformCallback<T> = (v: T) => T


export type XVMeta<T> = {
   optional?: boolean;
   nullable?: boolean;
   default?: XVDefaultValue<T>;
   [key: string]: any
};
