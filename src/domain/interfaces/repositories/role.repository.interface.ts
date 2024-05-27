import { Role } from "src/domain/entities/role";
import { Repository } from "typeorm";

export interface IRoleRepository extends Repository<Role> { }