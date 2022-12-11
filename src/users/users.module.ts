import { Module, MiddlewareConsumer, Global } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../config/jwtconfig.service';
import {AuthService} from '../auth/auth.service';
import { IsAuthMiddleware } from '../middleware/is-auth.middleware';
import { ConfigModule} from '@nestjs/config';

@Global()
@Module({
  imports: [UsersModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV}`
  }),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
  JwtModule.registerAsync({
    useClass: JwtConfigService,
  })],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
  ,exports: [UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAuthMiddleware).exclude('/auth/signup', '/auth/signin').forRoutes('*');
}
}
