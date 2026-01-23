export type Infer<T> = T extends { _type: infer R } ? R : never

export type XVCheckCallback<T> = (value: unknown) => T | void
export type XVDefaultValue<T> = T | (() => T)
export type XVTransformCallback<T> = (v: T) => T


export type XVMeta<T> = {
   optional?: boolean;
   nullable?: boolean;
   default?: XVDefaultValue<T>;
   [key: string]: any
};
