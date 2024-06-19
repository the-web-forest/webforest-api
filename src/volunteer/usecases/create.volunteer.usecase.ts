import { Inject } from "@nestjs/common";
import IUseCase from "../../domain/interfaces/usecase/IUseCase";
import CreateVolunteerUseCaseInput from "./dtos/create.volunteer.usecase.input";
import CreateVolunteerUseCaseOutput from "./dtos/create.volunteer.usecase.output";
import VolunteerRepository from "../../external/repositories/volunteer.repository";
import { VolunteerRepositoryToken } from "../volunteer.tokens";
import { IVolunteerRepository } from "../../domain/interfaces/repositories/volunteer.repository.interface";
import VolunteerAlreadyRegisteredError from "../../core/error/volunteer.already.registered.error";

export default class CreateVolunteerUseCase implements IUseCase<CreateVolunteerUseCaseInput, CreateVolunteerUseCaseOutput> {

    constructor(
        @Inject(VolunteerRepositoryToken)
        private readonly volunteerRepository: IVolunteerRepository
    ) { }

    async run(input: CreateVolunteerUseCaseInput): Promise<CreateVolunteerUseCaseOutput> {

        const volunteerByLinkedIn = await this.volunteerRepository.findOne({
            where: {
                linkedInUrl: input.linkedInUrl
            }
        })

        if(volunteerByLinkedIn) {
            throw new VolunteerAlreadyRegisteredError()
        }

        return await this.volunteerRepository.save({ ...input })
    }

}