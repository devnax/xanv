import XVType from "./XVType";
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
import XVFunction from "./types/Function";
import XVPromise from "./types/Promise";

export * from "./types";

export {
   XVType,
   XVAny,
   XVArray,
   XVBoolean,
   XVFunction,
   XVPromise,
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

export const xv = {
   any: () => new XVAny(),
   array: <T extends XVType<any>>(type: T) => new XVArray<T>(type),
   boolean: () => new XVBoolean(),
   date: () => new XVDate(),
   enum: <T extends string | number>(input: readonly T[] | Record<string, T>): XVEnum<T> => new XVEnum<T>(input),
   file: () => new XVFile(),
   number: (length?: number) => new XVNumber(length),
   object: <T extends Record<string, XVType<any>>>(shape: T): XVObject<T> => new XVObject(shape),
   record: <K extends XVType<any>, V extends XVType<any>>(key: K, value: V) => new XVRecord<K, V>(key, value),
   map: <K extends XVType<any>, V extends XVType<any>>(key: K, value: V) => new XVMap<K, V>(key, value),
   set: <T extends XVType<any>>(type: T) => new XVSet(type),
   string: (length?: number) => new XVString(length),
   tuple: <T extends XVType<any>[]>(type: T) => new XVTuple<T>(type),
   union: <T extends XVType<any>[]>(types: T) => new XVUnion<T>(types),
   function: <const A extends XVType<any>[], R extends XVType<any>>(args: A, ret: R) => new XVFunction<A, R>(args, ret),
   promise: <T extends XVType<any>>(type: T) => new XVPromise(type),
};

