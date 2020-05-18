import recipeService from '@/services/recipe-service';
import HttpClient from '@/services/http-client';
import { RecipeModel } from '@/model/recipe-model';

import fn = jest.fn;

const recipe1: RecipeModel = { id: 1, name: 'Recette 1' };
describe('RecipeService', () => {
  it('should get all the recipes', async () => {
    // given
    HttpClient.get = fn().mockImplementation(() => Promise.resolve({ data: [recipe1] }));

    // when
    const result = await recipeService.getAll();

    // then
    expect(HttpClient.get).toBeCalledWith('/recipes');
    expect(result).toContainEqual(recipe1);
  });

  it('should add a recipe', async () => {
    // given
    HttpClient.post = fn().mockImplementation(() => Promise.resolve({ data: {} }));
    const recipe: RecipeModel = {
      id: null,
      name: 'Test de recette',
    };


    // when
    await recipeService.add(recipe);

    // then
    expect(HttpClient.post).toBeCalledWith('/recipes', recipe);
  });

  it('should get a recipe', async () => {
    // given
    HttpClient.get = fn().mockImplementation(() => Promise.resolve({ data: recipe1 }));

    // when
    const result = await recipeService.getById(1);

    // then
    expect(HttpClient.get).toBeCalledWith('/recipes/1');
    expect(result).toBe(recipe1);
  });
});
