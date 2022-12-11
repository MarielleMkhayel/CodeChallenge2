import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.model';
import mongoose from 'mongoose';
import { Serialize} from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../auth/dtos/login-user.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { isAdmin } from '../decorators/adminUser.decorator';
import { AdminUserGuard } from '../guards/adminUser.guard';

@Serialize(UserDto) 
@Controller('auth')
export class UsersController {
    constructor(private authService: AuthService, private usersService: UsersService){}
    
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto){
        return  this.authService.signup(body.email, body.password, body.firstName, body.lastName, body.isVIP, body.isAdmin);
    }

    @Post('/signin')
    async signin(@Body() body: LoginUserDto){
        return this.authService.signin(body.email, body.password);
    }

    @Get('/whoami')
    @UseGuards(AdminUserGuard)
    @isAdmin(true)
    whoami(@CurrentUser() user: User){
        return user;
    }

    @Get('/getUser/:id')
    @UseGuards(AdminUserGuard)
    @isAdmin(true)
    findUser(@Param('id') id: mongoose.Types.ObjectId ){
        return this.usersService.findUser(id);    
    }
}