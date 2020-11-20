import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RecipeModel } from './models/recipe.model';
import { ListService } from './services/list.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get()
  findAll(): Observable<RecipeModel[]> {
    return this.listService.findAll();
  }
}
