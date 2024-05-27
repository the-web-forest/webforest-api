
import { ActivationRequest } from "src/domain/entities/activation.request";
import { Repository } from "typeorm";

export interface IActivationRequestRepository extends Repository<ActivationRequest> { }