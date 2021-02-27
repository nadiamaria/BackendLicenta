import { Module } from '@nestjs/common';
import { RecipeModule } from './Recipes/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [RecipeModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
