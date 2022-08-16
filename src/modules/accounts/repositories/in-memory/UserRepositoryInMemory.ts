import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UserRepositoryInMemory implements IUsersRepository {
    users: User[] = [];
    async findById(id: string): Promise<User> {
        return this.users.find(user=> user.id === id);
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }
    async create({ name, email, password, driver_license, id, avatar, }: ICreateUserDTO): Promise<void> {
       const user = new User();
       Object.assign(user, {
        driver_license,
        email,
        name,
        password,
       });
       this.users.push(user);
    }

}

export { UserRepositoryInMemory }