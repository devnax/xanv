import XVType from "../XVType"

export interface XVFileLike {
   name: string
   size: number
   type: string
   [key: string]: any
}

export class XVFile extends XVType<File | XVFileLike> {

   parse(input: unknown): File | XVFileLike {
      if (
         !(
            (typeof File !== "undefined" && input instanceof File) ||
            (typeof input === "object" && input !== null && "name" in input && "size" in input && "type" in input)
         )
      ) {
         throw new Error("Expected File or File-like object")
      }

      let file = input as File | XVFileLike

      // Run checks
      for (const check of this.checks) check(file)

      return file
   }

   // =======================
   // Validators
   // =======================
   maxSize(maxBytes: number, msg?: string): this {
      this.checks.push(file => {
         if (file.size > maxBytes) throw new Error(msg || `File size must be <= ${maxBytes} bytes`)
      })
      return this
   }

   minSize(minBytes: number, msg?: string): this {
      this.checks.push(file => {
         if (file.size < minBytes) throw new Error(msg || `File size must be >= ${minBytes} bytes`)
      })
      return this
   }

   allowedTypes(...types: string[]): this {
      this.checks.push(file => {
         if (!types.includes(file.type)) throw new Error(`File type must be one of: ${types.join(", ")}`)
      })
      return this
   }

   // default / optional / nullable inherited from XVType
}
