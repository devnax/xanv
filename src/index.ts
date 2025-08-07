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


const c = xv.string().min(5).max(10);
const bool = xv.array(xv.boolean()).default(['HELLO123', 'WORLD']);

const val = bool.parse(["as"]);
console.log(val); // "HELLO123"