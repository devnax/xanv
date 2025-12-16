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
import XVJson from "./types/Json";

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
   XVJson,
};

export const xv = {
   any: () => new XVAny(),
   array: (type: XVInstanceType, length?: number) => new XVArray(type, length),
   boolean: () => new XVBoolean(),
   date: () => new XVDate(),
   enum: (values: XVEnumValues) => new XVEnum(values),
   file: () => new XVFile(),
   map: (key: XVInstanceType, value: XVInstanceType) => new XVMap(key, value),
   number: (length?: number) => new XVNumber(length),
   object: (arg?: XVObjectType) => new XVObject(arg),
   record: (key: XVInstanceType, value: XVInstanceType) => new XVRecord(key, value),
   set: (type: XVInstanceType) => new XVSet(type),
   string: (length?: number) => new XVString(length),
   tuple: (type: XVInstanceType[]) => new XVTuple(type),
   union: (type: XVInstanceType[]) => new XVUnion(type),
   json: () => new XVJson(),
}

export type Infer<T> =
   T extends XanvType<infer U> ? U :
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
   T extends XVJson ? object :
   T extends XVObject ? (T extends { arg?: infer O } ? { [K in keyof O]: Infer<O[K]> } : any) :
   T extends object ? { [K in keyof T]: Infer<T[K]> } :
   any;

