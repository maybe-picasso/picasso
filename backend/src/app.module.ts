import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { SocketGateway } from './app.socket';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/picasso'), AuthModule, UsersModule, CatsModule],
  controllers: [AppController],
  providers: [SocketGateway],
})
export class AppModule {}
