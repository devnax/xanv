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

export type XVInstanceType =
   | XVAny
   | XVArray
   | XVBoolean
   | XVDate
   | XVEnum
   | XVFile
   | XVMap
   | XVNumber
   | XVObject
   | XVRecord
   | XVSet
   | XVString
   | XVTuple
   | XVUnion

export type XanvTransformCallback<T> = (value: T) => T;
export type XVCheckCallback<T> = (value: T) => void;

export type XVEnumValues = (string | number)[];

export type XVObjectKeyType = string | number | symbol;
export type XVObjectValueType = XVInstanceType;
export type XVObjectType = Record<XVObjectKeyType, XVObjectValueType>;