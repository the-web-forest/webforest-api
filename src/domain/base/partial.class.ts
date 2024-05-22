export default abstract class PartialClass {
    constructor(data: Partial<PartialClass>) {
      Object.assign(this, data);
    }
  }
  