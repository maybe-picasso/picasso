import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { SocketGateway } from './app.socket';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const { DB_HOST } = process.env;

@Module({
  imports: [MongooseModule.forRoot(`${DB_HOST}/picasso`), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [SocketGateway],
})
export class AppModule {}
