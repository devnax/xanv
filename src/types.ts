import XVType from "./XVType"


export type XVOptional<T extends XVType<any>> = T & { meta: { optional: true } }
export type XVNullable<T extends XVType<any>> = T & { meta: { nullable: true } }
export type XVDefault<T extends XVType<any>, V extends XVDefaultValue<any>> = T & { meta: { default: XVDefaultValue<V> } }


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
   T extends Record<string, XVType<any>> ? Simplify<InferObject<T>> :
   T extends { _type: infer R } ? R : never

export type XVCheckCallback<T> = (value: unknown) => T | void
export type XVDefaultValue<T> = T | (() => T)
export type XVTransformCallback<T> = (v: T) => T


export type XVMeta<T> = {
   optional?: boolean;
   nullable?: boolean;
   default?: XVDefaultValue<T>;
   [key: string]: any
};
