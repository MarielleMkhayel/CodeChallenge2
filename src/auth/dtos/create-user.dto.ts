import {IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength} from 'class-validator';

export class CreateUserDto{
    @IsNotEmpty()
    @IsEmail()
    @Length(7, 100)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(2,100)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(2,100)
    lastName: string;

    @IsOptional()
    @IsBoolean()
    isVIP?: boolean;

    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean;
}