import { IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  readonly username: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'Password must be at least 6 characters long and contain at least one letter and one number',
  })
  readonly password: string;
}
