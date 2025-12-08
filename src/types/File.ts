import XanvType from "../XanvType";

class XVFile<T extends File | Blob = File | Blob> extends XanvType<T> {
   constructor(size?: number) {
      super();
      if (size) {
         this.size(size);
      }
   }

   protected check(value: any) {
      if (!(value instanceof File) || !(value instanceof Blob)) {
         throw new Error(`Value should be a File or Blob, received ${typeof value}`);
      }
   }

   size(size: number) {
      return this.set('size', (v: any) => {
         if (!(v instanceof File) && !(v instanceof Blob)) {
            throw new Error(`Value should be a File or Blob, received ${typeof v}`);
         }
         if (v.size !== size) {
            throw new Error(`File size should be exactly ${size} bytes, received ${v.size} bytes`);
         }
      }, size);
   }

   minsize(size: number) {
      return this.set('minsize', (v: any) => {
         if (v.size < size) {
            throw new Error(`File size should be at least ${size} bytes, received ${v.size} bytes`);
         }
      }, size);
   }

   maxsize(size: number) {
      return this.set('maxsize', (v: any) => {
         if (v.size > size) {
            throw new Error(`File size should not exceed ${size} bytes, received ${v.size} bytes`);
         }
      }, size);
   }

   type(allowedTypes: string[]) {
      return this.set('type', (v: any) => {
         if (!allowedTypes.includes(v.type)) {
            throw new Error(`File type ${v.type} is not allowed. Allowed types are: ${allowedTypes.join(', ')}`);
         }
      }, allowedTypes);
   }

   extension(allowedExtensions: string[]) {
      return this.set('extension', (v: any) => {
         const ext = v.name.split('.').pop();
         if (!ext || !allowedExtensions.includes(ext)) {
            throw new Error(`File extension ${ext} is not allowed. Allowed extensions are: ${allowedExtensions.join(', ')}`);
         }
      }, allowedExtensions);
   }
}

export default XVFile;