import { Injectable, CanActivate, ExecutionContext, Inject, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminUserGuard implements CanActivate {

constructor(@Inject(UsersService) private usersService: UsersService, private reflector: Reflector) {}
  
async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = await context.switchToHttp().getRequest();
    const roles = this.reflector.get<boolean>('roles', context.getHandler())
    const user = await this.usersService.findUser(req.user);
    if(!user){
        throw new NotFoundException('User not found.')
    }
    if((user.isAdmin ? true : false) === roles){
      return true;
    }
    return false;
  }
}