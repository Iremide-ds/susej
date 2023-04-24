import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import UserDTO from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }

  async createUser(user: UserDTO): Promise<string> {
    const existingUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    if (existingUser) {
      return `A user already exists with the id: ${user.id}`;
    } else {
      await this.usersRepository.create({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      return 'success';
    }
  }

  async getUser(id: string): Promise<string | User> {
    const existingUser = await this.usersRepository.findOne({
      where: { id: id },
    });
    return existingUser === null ? `No user with id: ${id}` : existingUser;
  }

  async updateUser(id: string, user: UserDTO): Promise<string> {
    const existingUser = await this.usersRepository.findOne({
      where: { id: id },
    });

    if (existingUser) {
      existingUser.set({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });

      await existingUser.save();

      return 'success';
    } else {
      return 'unexisting user';
    }
  }

  async deleteUser(id: string): Promise<string> {
    const existingUser = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (existingUser) {
      await existingUser.destroy();
      return 'success';
    } else {
      return 'unexisting user';
    }
  }
}
