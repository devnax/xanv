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
   XVObjectKeyType,
   XVObjectValueType,
} from "./types";

export type {
   XVEnumValues,
   XVInstanceType,
   XVObjectType,
   XVCheckCallback,
   XVObjectKeyType,
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

export const xv = {
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

