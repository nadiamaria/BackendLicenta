import { Module } from '@nestjs/common';
import { ListModule } from './List/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ListModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
