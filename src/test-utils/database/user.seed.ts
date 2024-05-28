import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";

export default class UserSeedTestHelper {
    static async seed(userRepository: IUserRepository) {
        await userRepository.save({
            firstName: 'Ana',
            lastName: 'Silva',
            email: 'ana.silva@example.com',
            password: 'password1',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Carlos',
            lastName: 'Santos',
            email: 'carlos.santos@example.com',
            password: 'password2',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Beatriz',
            lastName: 'Costa',
            email: 'beatriz.costa@example.com',
            password: 'password3',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Daniel',
            lastName: 'Almeida',
            email: 'daniel.almeida@example.com',
            password: 'password4',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Fernanda',
            lastName: 'Lima',
            email: 'fernanda.lima@example.com',
            password: 'password5',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Gustavo',
            lastName: 'Ramos',
            email: 'gustavo.ramos@example.com',
            password: 'password6',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Helena',
            lastName: 'Oliveira',
            email: 'helena.oliveira@example.com',
            password: 'password7',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Igor',
            lastName: 'Mendes',
            email: 'igor.mendes@example.com',
            password: 'password8',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Juliana',
            lastName: 'Pereira',
            email: 'juliana.pereira@example.com',
            password: 'password9',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await userRepository.save({
            firstName: 'Lucas',
            lastName: 'Martins',
            email: 'lucas.martins@example.com',
            password: 'password10',
            isActive: true,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

    }
}