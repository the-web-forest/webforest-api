import { CustomError } from "./custom.error";

export default class NewsAlreadyRegisteredError extends CustomError {
    constructor(){
        super('News Already Registered', '0009')
    }
}