import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './services/list.service';
import { RecipeEntity } from './models/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
