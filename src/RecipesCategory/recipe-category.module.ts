import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeCategoryEntity } from './entities/recipe-category.entity';
import { RecipeCategoryController } from './recipe-category.controller';
import { RecipeCategoryService } from './services/recipe-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeCategoryEntity])],
  controllers: [RecipeCategoryController],
  providers: [RecipeCategoryService],
})
export class RecipeCategoryModule {}
