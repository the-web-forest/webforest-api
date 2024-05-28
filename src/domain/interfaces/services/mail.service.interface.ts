import { ActivationRequest } from "src/domain/entities/activation.request";
import { User } from "../../entities/user";

export default interface IMailService {
    sendUserActivationEmail(request: ActivationRequest): Promise<void>
    sendWelcomeEmail(user: User): Promise<void>
}