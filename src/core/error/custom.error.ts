export abstract class CustomError {
  private readonly message: string;
  private readonly code: string;

  constructor(message: string, code: string) {
    this.message = message;
    this.code = 'WF-' + code;
    throw new Error(JSON.stringify(this));
  }
}
