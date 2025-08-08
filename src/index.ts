import XanArray, { XanArrayInfo } from "./types/Array";
import XanBoolean from "./types/Boolean";
import XanNumber from "./types/Number";
import XanObject, { XanObjectType } from "./types/Object";
import XanString from "./types/String";
import { XanvInstanceType } from "./types/types";
import XanBase from "./types/XanBase";
export { XanString };


const xv = {
   string: (length?: number) => new XanString(length),
   boolean: () => new XanBoolean(),
   array: (type: XanvInstanceType) => new XanArray(type),
   object: (arg?: XanObjectType) => new XanObject(arg),
   number: (length?: number) => new XanNumber(length)
}


const c = xv.string();
const bool = xv.array(xv.string()).nullable().default(['HELLO123', 'WORLD']);
const ob = xv.object({
   name: xv.string().min(3).max(20),
   age: xv.number().default(123).min(1).max(3),
   isActive: xv.boolean().optional().default(false),
   tags: xv.array(xv.object()).unique()
});

const val = ob.parse({
   name: 'John Doe',
   age: null,
   // isActive: true,
   tags: [
      {
         id: 1
      },
      {
         id: 2
      }
   ]
});

// const val = bool.parse(['HELLO123', 'WORLD']);
console.log(val);