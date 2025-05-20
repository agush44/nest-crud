import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

describe('UsersController', () => {
  let controller: UsersController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UsersService;

  const mockUserResponse: UserResponseDto = {
    id: 'uuid-123',
    username: 'testuser',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([mockUserResponse]),
    findOne: jest.fn().mockResolvedValue(mockUserResponse),
    create: jest.fn().mockResolvedValue(mockUserResponse),
    update: jest.fn().mockResolvedValue({
      message: 'User updated successfully',
      user: mockUserResponse,
    }),
    remove: jest
      .fn()
      .mockResolvedValue({ message: 'User deleted successfully' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await controller.findAll()).toEqual([mockUserResponse]);
      expect(mockUsersService.findAll).toHaveBeenCalled();
      expect(mockUsersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      expect(await controller.findOne('uuid-123')).toEqual(mockUserResponse);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('uuid-123');
      expect(mockUsersService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = { username: 'testuser', password: '123456' };
      expect(await controller.create(dto)).toEqual(mockUserResponse);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
      expect(mockUsersService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = await controller.update('uuid-123', {
        username: 'updated',
      });
      expect(result).toEqual({
        message: 'User updated successfully',
        user: mockUserResponse,
      });
      expect(mockUsersService.update).toHaveBeenCalledWith('uuid-123', {
        username: 'updated',
      });
      expect(mockUsersService.update).toHaveBeenCalledTimes(1);
    });
  });

  it('should delete a user', async () => {
    expect(await controller.remove('uuid-123')).toEqual({
      message: 'User deleted successfully',
    });
    expect(mockUsersService.remove).toHaveBeenCalledWith('uuid-123');
    expect(mockUsersService.remove).toHaveBeenCalledTimes(1);
  });
});
