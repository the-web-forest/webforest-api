import { Injectable } from "@nestjs/common";
import { User } from "../../domain/entities/user";
import BaseRepository from "./base.repository";
import { IUserRepository } from "src/domain/interfaces/repositories/user.repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor(
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>
    ) {
        super(usersRepository);
    }
}