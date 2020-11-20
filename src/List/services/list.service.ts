import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { MockedRecipes } from '../mocks/recipe.mocked';
import { RecipeModel } from '../models/recipe.model';

@Injectable()
export class ListService {
  public findAll(): Observable<RecipeModel[]> {
    return of(MockedRecipes);
  }
}
