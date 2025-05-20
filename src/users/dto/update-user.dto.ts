import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
