import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private toResponseDto(user: User): UserResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(data: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username: data.username },
    });

    if (existingUser) {
      throw new BadRequestException('Username is already taken');
    }

    let hashedPassword: string | undefined = undefined;
    if (data.password) {
      hashedPassword = await this.hashPassword(data.password);
    }

    const newUser = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.toResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toResponseDto(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<{ message: string; user: UserResponseDto }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (dto.username && dto.username !== user.username) {
      const usernameTaken = await this.userRepository.findOne({
        where: { username: dto.username },
      });
      if (usernameTaken) {
        throw new BadRequestException('Username is already taken');
      }
    }

    if (dto.password) {
      dto.password = await this.hashPassword(dto.password);
    }

    await this.userRepository.update(id, dto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) throw new NotFoundException('User not found');

    return {
      message: 'User updated successfully',
      user: this.toResponseDto(updatedUser),
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.delete(id);
    return { message: 'User deleted successfully' };
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'password',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
