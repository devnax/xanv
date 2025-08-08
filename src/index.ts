import XanArray, { XanArrayInfo } from "./types/Array";
import XanBoolean from "./types/Boolean";
import XanString from "./types/String";
import XanType from "./types/Type";
export { XanString };


const xv = {
   string: (length?: number) => new XanString(length),
   boolean: () => new XanBoolean(),
   array: (type?: XanType<XanArrayInfo, any[]>) => new XanArray(type),
}


const c = xv.string();
const bool = xv.array(xv.boolean()).nullable().default(['HELLO123', 'WORLD']);

const val = bool.parse([true]);
console.log(val); // "HELLO123"