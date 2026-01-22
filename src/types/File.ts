import XVType from "../XVType";

class XVFile extends XVType<File | Blob> {
   constructor(size?: number) {
      super();
      if (size !== undefined) {
         this.size(size);
      }
   }

   protected check(input: unknown): File | Blob {
      if (
         !(
            (typeof File !== "undefined" && input instanceof File) ||
            (typeof input === "object" && input !== null && "name" in input && "size" in input && "type" in input)
         )
      ) {
         throw new Error("Expected File or File-like object")
      }
      return input as File | Blob
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
