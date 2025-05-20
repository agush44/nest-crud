import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthResponse = {
    user: {
      id: 'uuid-123',
      username: 'testuser',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    accessToken: 'jwt-token',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn().mockResolvedValue(mockAuthResponse),
            login: jest.fn().mockResolvedValue(mockAuthResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call register and return response', async () => {
      const dto: RegisterDto = { username: 'testuser', password: '123456' };
      const result = await controller.register(dto);
      expect(result).toEqual(mockAuthResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should call login and return response', async () => {
      const dto: LoginDto = { username: 'testuser', password: '123456' };
      const result = await controller.login(dto);
      expect(result).toEqual(mockAuthResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.login).toHaveBeenCalledWith(dto);
    });
  });
});
