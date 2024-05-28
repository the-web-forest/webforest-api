import { Injectable } from "@nestjs/common";
import BaseRepository from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActivationRequest } from "../../domain/entities/activation.request";
import { IActivationRequestRepository } from "../../domain/interfaces/repositories/activation.request.repository.interface";

@Injectable()
export default class ActivationRequestRepository extends BaseRepository<ActivationRequest> implements IActivationRequestRepository {
    constructor(
      @InjectRepository(ActivationRequest)
      private readonly activationRequestsRepository: Repository<ActivationRequest>
    ) {
        super(activationRequestsRepository);
    }
}