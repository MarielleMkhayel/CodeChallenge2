import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{
    @Prop({required: true, lowercase: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;  

    @Prop({required: true, lowercase: true})
    firstName: string;

    @Prop({required: true, lowercase: true})
    lastName: string;

    @Prop({default: false})
    isVIP?: boolean;

    @Prop()
    isAdmin?: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({email:1, isVIP: 1});
export {UserSchema};
