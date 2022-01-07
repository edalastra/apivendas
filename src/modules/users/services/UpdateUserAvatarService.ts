import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      this.__deleteAvatarFile(user);
    }

    user.avatar = avatarFileName;
    await usersRepository.save(user);
    return user;
  }

  private async __deleteAvatarFile(user: User) {
    const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
    const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

    if (userAvatarFileExists) {
      await fs.promises.unlink(userAvatarFilePath);
    }
  }
}

export default UpdateUserAvatarService;
