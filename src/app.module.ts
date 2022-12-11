import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),ComplaintsModule, UsersModule, 
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_URL}`),],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    }),
  }],
})
export class AppModule {}
