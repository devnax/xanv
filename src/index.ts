import XanvType from "./XanvType";
import XVAny from "./types/Any";
import XVArray from "./types/Array";
import XVBoolean from "./types/Boolean";
import XVDate from "./types/Date";
import XVEnum from "./types/Enum";
import XVFile from "./types/File";
import XVMap from "./types/Map";
import XVNumber from "./types/Number";
import XVObject from "./types/Object";
import XVRecord from "./types/Record";
import XVSet from "./types/Set";
import XVString from "./types/String";
import XVTuple from "./types/Tuple";
import XVUnion from "./types/Union";

import {
   XVEnumValues,
   XVInstanceType,
   XVObjectType,
   XVCheckCallback,
   XVObjectValueType,
} from "./types";

export type {
   XVEnumValues,
   XVInstanceType,
   XVObjectType,
   XVCheckCallback,
   XVObjectValueType,
};

export {
   XanvType,
   XVAny,
   XVArray,
   XVBoolean,
   XVDate,
   XVEnum,
   XVFile,
   XVMap,
   XVNumber,
   XVObject,
   XVRecord,
   XVSet,
   XVString,
   XVTuple,
   XVUnion,
};

const _xv = {
   array: (type: XVInstanceType, length?: number) => new XVArray(type, length),
   boolean: () => new XVBoolean(),
   date: () => new XVDate(),
   enum: (values: XVEnumValues) => new XVEnum(values),
   map: (key: XVInstanceType, value: XVInstanceType) => new XVMap(key, value),
   number: (length?: number) => new XVNumber(length),
   object: (arg?: XVObjectType) => new XVObject(arg),
   record: (key: XVInstanceType, value: XVInstanceType) => new XVRecord(key, value),
   set: (type: XVInstanceType) => new XVSet(type),
   string: (length?: number) => new XVString(length),
   tuple: (type: XVInstanceType[]) => new XVTuple(type),
   union: (type: XVInstanceType[]) => new XVUnion(type),
}

// Strongly-typed factory signatures for compile-time only usage
export interface XVStatic {
   array<T>(type: XVInstanceOf<T>, length?: number): XVArray<T> & XVInstanceOf<T[]>;
   tuple<T extends any[]>(types: { [K in keyof T]: XVInstanceOf<T[K]> }): XVTuple<T> & XVInstanceOf<T>;
   union<T extends any[]>(types: { [K in keyof T]: XVInstanceOf<T[K]> }): XVUnion<T> & XVInstanceOf<T>;
   boolean(): XVBoolean<boolean> & XVInstanceOf<boolean>;
   date(): XVDate<Date> & XVInstanceOf<Date>;
   enum<T extends string | number = string | number>(values: XVEnumValues): XVEnum<T> & XVInstanceOf<T>;
   map<K, V>(key: XVInstanceOf<K>, value: XVInstanceOf<V>): XVMap<K, V> & XVInstanceOf<Map<K, V>>;
   number(): XVNumber<number> & XVInstanceOf<number>;
   object<S extends Record<string, any> = Record<string, any>>(arg?: { [K in keyof S]: XVInstanceOf<S[K]> }): XVObject<S> & XVInstanceOf<{ [K in keyof S]: S[K] }>;
   record<K extends string = string, V = any>(key: XVInstanceOf<K>, value: XVInstanceOf<V>): XVRecord<K, V> & XVInstanceOf<Record<K, V>>;
   set<T>(type: XVInstanceOf<T>): XVSet<T> & XVInstanceOf<Set<T>>;
   string(): XVString<string> & XVInstanceOf<string>;
   string(length: number): XVString<string> & XVInstanceOf<string>;
   any(): XVAny<any> & XVInstanceOf<any>;
}

export const xv = _xv as unknown as XVStatic;

// Type-level inference utility
// Use: type T = Infer<typeof schema>
// Phantom generic wrapper type for compile-time inference.
// Factory helpers will annotate returned instances with this to carry type information.
export type XVInstanceOf<T = any> = XanvType<any, T> & {
   meta: {
      optional: false,
      nullable: false,
      default: undefined,
      transform: undefined,
   }
};

export type Infer<T> =
   // If the value is an XVInstanceOf carrying a compile-time type, extract it
   T extends XVInstanceOf<infer U> ? U :
   // direct XV class instances without phantom info (fallbacks)
   T extends XVString ? string :
   T extends XVNumber ? number :
   T extends XVBoolean ? boolean :
   T extends XVDate ? Date :
   T extends XVAny ? any :
   T extends XVFile ? File | Blob :
   T extends XVEnum ? (string | number) :
   T extends XVArray ? any[] :
   T extends XVTuple ? any[] :
   T extends XVUnion ? any :
   T extends XVMap ? Map<any, any> :
   T extends XVSet ? Set<any> :
   T extends XVRecord ? Record<string, any> :
   // XVObject with an `arg` schema
   T extends XVObject ? (T extends { arg?: infer O } ? { [K in keyof O]: Infer<O[K]> } : any) :
   // Plain schema object (e.g. { a: xv.string(), b: xv.number() }) — recurse
   T extends object ? { [K in keyof T]: Infer<T[K]> } :
   any;

// Merge types onto the runtime `xv` export so users can write `type T = xv.infer<typeof schema>`
export namespace xv {
   export type infer<T> = Infer<T>;
}

