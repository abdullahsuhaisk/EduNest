import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail() // Decarator
  email: string;

  @IsString() // Decarator
  password: string;
}
// adding DTO 3 create dtos file and rules

// adding DTO dont forget to adding package
// npm install class-validator class-transformer
