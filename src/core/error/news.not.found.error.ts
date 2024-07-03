import { CustomError } from "./custom.error";

export default class NewsNotFoundError extends CustomError {
    constructor() {
        super('News Not Found', '0007');
    }
}