import XanvType from "../XanvType";
export type XVFileInfo = "size" | "minsize" | "maxsize" | "type" | "extension";
class XVFile<T extends File | Blob = File | Blob> extends XanvType<XVFileInfo, T> {
   constructor(size?: number) {
      super();
      if (size) {
         this.set('size', (v: any) => {
            if (!(v instanceof File) && !(v instanceof Blob)) {
               throw new Error(`Value should be a File or Blob, received ${typeof v}`);
            }
            if (v.size !== size) {
               throw new Error(`File size should be exactly ${size} bytes, received ${v.size} bytes`);
            }
         });
      }
   }

   protected check(value: any) {
      if (!(value instanceof File) || !(value instanceof Blob)) {
         throw new Error(`Value should be a File or Blob, received ${typeof value}`);
      }
   }

   minSize(size: number): this {
      this.set('minsize', (v: any) => {
         if (v.size < size) {
            throw new Error(`File size should be at least ${size} bytes, received ${v.size} bytes`);
         }
      }, size);
      return this;
   }

   maxSize(size: number): this {
      this.set('maxsize', (v: any) => {
         if (v.size > size) {
            throw new Error(`File size should not exceed ${size} bytes, received ${v.size} bytes`);
         }
      }, size);
      return this;
   }

   type(allowedTypes: string[]): this {
      this.set('type', (v: any) => {
         if (!allowedTypes.includes(v.type)) {
            throw new Error(`File type ${v.type} is not allowed. Allowed types are: ${allowedTypes.join(', ')}`);
         }
      }, allowedTypes);
      return this;
   }

   extension(allowedExtensions: string[]): this {
      this.set('extension', (v: any) => {
         const ext = v.name.split('.').pop();
         if (!ext || !allowedExtensions.includes(ext)) {
            throw new Error(`File extension ${ext} is not allowed. Allowed extensions are: ${allowedExtensions.join(', ')}`);
         }
      }, allowedExtensions);
      return this;
   }
}

export default XVFile;

interface XVFileProto<T extends File | Blob = File | Blob> {
   parse(value: any): T | undefined | null;
   default(def: T | (() => T)): this;
   transform(cb: import("../types").XanvTransformCallback<T>): this;
}
Object.assign(XVFile.prototype as any, {} as XVFileProto);

