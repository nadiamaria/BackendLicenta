import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IngredientsCategoryEntity } from './entities/ingredients-category.entity';
import { IngredientsCategoryController } from './ingredients-category.controller';
import { IngredientsCategoryService } from './services/ingredients-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientsCategoryEntity])],
  controllers: [IngredientsCategoryController],
  providers: [IngredientsCategoryService],
})
export class IngredientsCategoryModule {}
