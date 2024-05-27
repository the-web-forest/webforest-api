import { ActivationRequest } from "src/domain/entities/activation.request";

export default interface IMailService {
    sendUserActivationEmail(request: ActivationRequest): Promise<void>
}