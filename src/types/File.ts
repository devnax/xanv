import XanvType from "../XanvType";
export type XVFileInfo = "size" | "minsize" | "maxsize" | "type" | "extension";
class XVFile extends XanvType<XVFileInfo, boolean> {
   name: string = 'XanvFile';

   constructor(size?: number) {
      super();
      if (size) {
         this.set('size', (v: any) => {
            if (!(v instanceof File) && !(v instanceof Blob)) {
               throw new Error(`Value should be a File or Blob, received ${typeof v}`);
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
      });
      return this;
   }

   maxSize(size: number): this {
      this.set('maxsize', (v: any) => {
         if (v.size > size) {
            throw new Error(`File size should not exceed ${size} bytes, received ${v.size} bytes`);
         }
      });
      return this;
   }

   type(allowedTypes: string[]): this {
      this.set('type', (v: any) => {
         if (!allowedTypes.includes(v.type)) {
            throw new Error(`File type ${v.type} is not allowed. Allowed types are: ${allowedTypes.join(', ')}`);
         }
      });
      return this;
   }

   extension(allowedExtensions: string[]): this {
      this.set('extension', (v: any) => {
         const ext = v.name.split('.').pop();
         if (!ext || !allowedExtensions.includes(ext)) {
            throw new Error(`File extension ${ext} is not allowed. Allowed extensions are: ${allowedExtensions.join(', ')}`);
         }
      });
      return this;
   }
}

export default XVFile;