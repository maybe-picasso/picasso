import { Module } from '@nestjs/common';
import { SocketGateway } from './app.socket';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [UsersModule, MoviesModule],
  providers: [SocketGateway],
})
export class AppModule {}
