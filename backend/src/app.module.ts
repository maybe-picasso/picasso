import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SocketGateway } from './app.socket';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [AuthModule, UsersModule, MoviesModule],
  controllers: [AppController],
  providers: [SocketGateway],
})
export class AppModule {}
