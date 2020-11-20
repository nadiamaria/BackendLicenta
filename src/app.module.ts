import { Module } from '@nestjs/common';
import { ListModule } from './List/list.module';

@Module({
  imports: [ListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
