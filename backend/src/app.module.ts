import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SocketGateway } from './app.socket';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, MoviesModule],
  controllers: [AppController],
  providers: [SocketGateway],
})
export class AppModule {}
