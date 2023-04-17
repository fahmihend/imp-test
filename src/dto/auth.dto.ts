import { IsNotEmpty, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class AuthDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @MinLength(2)
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;

  fullname: string;
}
