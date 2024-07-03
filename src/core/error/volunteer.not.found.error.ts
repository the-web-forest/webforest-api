import { CustomError } from "./custom.error";

export default class VolunteerNotFoundError extends CustomError {
    constructor(){
        super('Volunteer Not Found', '0008' )
    }
}