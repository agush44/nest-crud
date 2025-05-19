import {
  IsString,
  IsNumber,
  IsBoolean,
  MaxLength,
  Min,
  IsOptional,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsDefined()
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsDefined()
  @IsString()
  description!: string;

  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price!: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
