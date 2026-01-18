import XanvType from "./XanvType";
import XVAny from "./types/Any";
import XVArray from "./types/Array";
import XVBoolean from "./types/Boolean";
import XVDate from "./types/Date";
import XVEnum from "./types/Enum";
import XVFile from "./types/File";
import XVMap from "./types/Map";
import XVNumber from "./types/Number";
import XVObject, { XVObjectShape } from "./types/Object";
import XVRecord from "./types/Record";
import XVSet from "./types/Set";
import XVString from "./types/String";
import XVTuple from "./types/Tuple";
import XVUnion from "./types/Union";
import XVJson from "./types/Json";

import {
   XVInstanceType,
   XVCheckCallback,
   Infer,
} from "./types";

export type {
   XVInstanceType,
   XVCheckCallback,
   Infer
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
   XVJson,
};

export const xv = {
   any: () => new XVAny(),

   array: <T extends XVInstanceType>(type: T, length?: number) =>
      new XVArray<T>(type, length),

   boolean: () => new XVBoolean(),
   date: () => new XVDate(),

   enum: <T extends readonly (string | number)[]>(...values: T) =>
      new XVEnum<T>(values),

   file: () => new XVFile(),
   number: (length?: number) => new XVNumber(length),

   object: <T extends XVObjectShape>(arg?: T) => new XVObject<T>(arg),

   record: <K extends XVInstanceType, V extends XVInstanceType>(key: K, value: V) =>
      new XVRecord<K, V>(key, value),

   map: <K extends XVInstanceType, V extends XVInstanceType>(key: K, value: V) =>
      new XVMap<K, V>(key, value),

   set: <T extends XVInstanceType>(type: T) => new XVSet<T>(type),
   string: (length?: number) => new XVString(length),

   tuple: <T extends XVInstanceType[]>(type: T) => new XVTuple<T>(type),
   union: <T extends XVInstanceType[]>(types: T) => new XVUnion<T>(types),

   json: () => new XVJson(),
};
