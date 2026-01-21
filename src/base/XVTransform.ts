import { XanvType } from ".."

class XVTransform<T, U> extends XanvType<U> {
   readonly _type!: U

   constructor(private inner: XanvType<T>, private fn: (v: T) => U) {
      super()
   }

   parse(input: unknown): U {
      const parsed = this.inner.parse(input)
      return this.fn(parsed)
   }


}

export default XVTransform