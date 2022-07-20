import { Module } from '@nestjs/common';
import { SocketGateway } from './app.socket';

@Module({
  imports: [],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule {}
