import { XanBaseErrorObject } from "./types/XanBase";

class XanvError<T> extends Error {
   error: XanBaseErrorObject<T>[] = []
   constructor(error: XanBaseErrorObject<T>[] = []) {
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