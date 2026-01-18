import XanvType from "./XanvType";
import XVAny from "./types/Any";
import XVArray from "./types/Array";
import XVBoolean from "./types/Boolean";
import XVDate from "./types/Date";
import XVEnum from "./types/Enum";
import XVFile from "./types/File";
import XVJson from "./types/Json";
import XVMap from "./types/Map";
import XVNumber from "./types/Number";
import XVObject, { XVObjectShape } from "./types/Object";
import XVRecord from "./types/Record";
import XVSet from "./types/Set";
import XVString from "./types/String";
import XVTuple from "./types/Tuple";
import XVUnion from "./types/Union";

export type XVInstanceType =
   | XVAny
   | XVArray<any>
   | XVBoolean
   | XVDate
   | XVEnum<any>
   | XVFile
   | XVMap<any, any>
   | XVNumber
   | XVObject<XVObjectShape>
   | XVRecord<XVInstanceType, XVInstanceType>
   | XVSet<any>
   | XVString
   | XVTuple<any>
   | XVUnion<any>
   | XVJson<Record<string, any>>;


export type XanvTransformCallback<T> = (value: T) => T;
export type XVCheckCallback<T> = (value: T) => void;



// Utility type to infer the TypeScript type from your schema
// Helper to decrement recursion depth
type Dec<N extends number> =
   N extends 5 ? 4 :
   N extends 4 ? 3 :
   N extends 3 ? 2 :
   N extends 2 ? 1 :
   N extends 1 ? 0 :
   0;

export type Infer<T, Depth extends number = 5> =
   Depth extends 0 ? any : // stop recursion
   T extends { meta: { optional: true; nullable: true } } ? InferType<T, Dec<Depth>> | null | undefined :
   T extends { meta: { optional: true } } ? InferType<T, Dec<Depth>> | undefined :
   T extends { meta: { nullable: true } } ? InferType<T, Dec<Depth>> | null :
   InferType<T, Dec<Depth>>;

type InferType<T, Depth extends number> =
   T extends XVString ? string :
   T extends XVNumber ? number :
   T extends XVBoolean ? boolean :
   T extends XVDate ? Date :
   T extends XVAny ? any :
   T extends XVFile ? File | Blob :
   T extends XVEnum<infer U> ? U[number] :
   T extends XVArray<infer U> ? Infer<U, Depth>[] :
   T extends XVTuple<infer U extends XVInstanceType[]> ? { [K in keyof U]: Infer<U[K], Depth> } :
   T extends XVUnion<infer U extends XVInstanceType[]> ? Infer<U[number], Depth> :
   T extends XVMap<infer K, infer V> ? Map<Infer<K, Depth>, Infer<V, Depth>> :
   T extends XVSet<infer U> ? Set<Infer<U, Depth>> :
   T extends XVRecord<infer K, infer V> ? Record<Infer<K, Depth>, Infer<V, Depth>> :
   T extends XVJson ? Record<string, any> :
   T extends XVObject<infer O> ? { [K in keyof O]: Infer<O[K], Depth> } :
   any;


