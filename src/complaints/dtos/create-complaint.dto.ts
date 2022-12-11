import {IsString, IsNotEmpty, Length} from 'class-validator';

export class CreateComplaintDto{
    
    @Length(2,100)
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @Length(5,500)
    @IsString()
    @IsNotEmpty()
    readonly body: string;

}