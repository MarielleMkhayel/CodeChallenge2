import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService{
    constructor(private usersService: UsersService, private readonly jwtService: JwtService){}

    async signup(email: string, password: string, firstName: string, lastName: string, isVIP: boolean, isAdmin: boolean){
        const users = await this.usersService.findUserByEmail(email);
        if (users){
            throw new BadRequestException('Email is already used.')
        }
        password = await bcrypt.hash(password, 12);
        const user = await this.usersService.signup(email, password, firstName, lastName, isVIP, isAdmin);
        return user;
    }

    async signin(email: string, password: string){
        const user = await this.usersService.findUserByEmail(email);
        if (!user){
            throw new NotFoundException('User not found.');
        }
        const result = await bcrypt.compare(password, user.password);
        if(!result){
            throw new BadRequestException('Wrong password for this email.')
        }
        const payload = {_id: user._id.toString(), email: user.email};
        const token = this.jwtService.sign(payload,
      {secret: 'myVerySecretySecret',
      expiresIn: '1h' }
    );

    return [ token, payload ];
        
    }
}
