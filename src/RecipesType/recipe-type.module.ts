import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeTypeEntity } from './entities/recipe-type.entity';
import { RecipeTypeController } from './recipe-type.controller';
import { RecipeTypeService } from './services/recipe-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeTypeEntity])],
  controllers: [RecipeTypeController],
  providers: [RecipeTypeService],
})
export class RecipeTypeModule {}
