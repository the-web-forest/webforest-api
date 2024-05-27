import { Injectable } from "@nestjs/common";
import BaseRepository from "./base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IActivationRequestRepository } from "src/domain/interfaces/repositories/activation.request.repository.interface";
import { ActivationRequest } from "src/domain/entities/activation.request";

@Injectable()
export default class ActivationRequestRepository extends BaseRepository<ActivationRequest> implements IActivationRequestRepository {
    constructor(
      @InjectRepository(ActivationRequest)
      private readonly activationRequestsRepository: Repository<ActivationRequest>
    ) {
        super(activationRequestsRepository);
    }
}