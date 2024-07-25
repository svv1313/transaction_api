import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsEnum(['trader', 'user'])
  role: string;

  @IsNumber()
  age: number;
}

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export interface SignInResponse {
  token: string;
}
