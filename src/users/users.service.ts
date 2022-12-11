
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UserDocument} from './user.model';
import mongoose from 'mongoose';

@Injectable()
export class UsersService {
  
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>) {}

        async signup(email: string, password: string, firstName: string, lastName: string, isVIP?: boolean, isAdmin?: boolean){
            const user = await this.userModel.create({email, password, firstName, lastName, isVIP, isAdmin});
            return user.save()
            
        }

        async findUserByEmail(email: string) {
            const user = await this.userModel.findOne({email});
            return user;
        }

        //find user by ID
        async findUser(id: mongoose.Types.ObjectId){
            const user = await this.userModel.findById(id);
            if(!user){
                throw new NotFoundException('User not found ayayay');
            }
            return user;
        }
}
