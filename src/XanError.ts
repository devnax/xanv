import { XanTypeErrorObject } from "./types/XanType";

class XanvError<T> extends Error {
   error: XanTypeErrorObject<T>[] = []
   constructor(error: XanTypeErrorObject<T>[] = []) {
      const message = error.map(e => e.message).join(', ');
      super(message)
      this.message = message;
      this.error = error;
   }

   toString() {
      return `XanvError: ${this.message}`;
   }
}

export default XanvError