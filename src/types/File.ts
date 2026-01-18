import XanvType from "../XanvType";

class XVFile extends XanvType<File | Blob, unknown> {
   constructor(size?: number) {
      super();
      if (size !== undefined) {
         this.size(size);
      }
   }

   protected check(value: unknown): File | Blob {
      if (!(value instanceof File || value instanceof Blob)) {
         throw new Error(
            `Value should be a File or Blob, received ${typeof value}`
         );
      }
      return value;
   }

   size(size: number) {
      return this.set(
         "size",
         (v: unknown) => {
            const file = v as File | Blob;
            if (file.size !== size) {
               throw new Error(
                  `File size should be exactly ${size} bytes, received ${file.size} bytes`
               );
            }
         },
         size
      );
   }

   minsize(size: number) {
      return this.set(
         "minsize",
         (v: unknown) => {
            const file = v as File | Blob;
            if (file.size < size) {
               throw new Error(
                  `File size should be at least ${size} bytes, received ${file.size} bytes`
               );
            }
         },
         size
      );
   }

   maxsize(size: number) {
      return this.set(
         "maxsize",
         (v: unknown) => {
            const file = v as File | Blob;
            if (file.size > size) {
               throw new Error(
                  `File size should not exceed ${size} bytes, received ${file.size} bytes`
               );
            }
         },
         size
      );
   }

   type(allowedTypes: string[]) {
      return this.set(
         "type",
         (v: unknown) => {
            const file = v as File | Blob;
            if (!allowedTypes.includes(file.type)) {
               throw new Error(
                  `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(
                     ", "
                  )}`
               );
            }
         },
         allowedTypes
      );
   }

   extension(allowedExtensions: string[]) {
      return this.set(
         "extension",
         (v: unknown) => {
            const file: any = v as File | Blob;
            const ext = file.name.split(".").pop();
            if (!ext || !allowedExtensions.includes(ext)) {
               throw new Error(
                  `File extension ${ext} is not allowed. Allowed extensions: ${allowedExtensions.join(
                     ", "
                  )}`
               );
            }
         },
         allowedExtensions
      );
   }
}

export default XVFile;
