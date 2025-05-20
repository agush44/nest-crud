import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @Get()
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<{ message: string; user: UserResponseDto }> {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.remove(id);
  }
}
