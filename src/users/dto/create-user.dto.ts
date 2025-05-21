import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  username!: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }: { value: string }) => value.trim())
  password!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
