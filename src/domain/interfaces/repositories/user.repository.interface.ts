import { User } from "src/domain/entities/user";
import { Repository } from "typeorm";

export interface IUserRepository extends Repository<User> { }