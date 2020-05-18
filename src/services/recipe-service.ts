import { RecipeModel } from '@/model/recipe-model';
import HttpClient from '@/services/http-client';

class RecipeService {
  private httpClient = HttpClient;

  /**
   * Return all the recipes
   */
  getAll(): Promise<RecipeModel[]> {
    return this.httpClient.get('/recipes')
      .then((response) => response.data);
  }

  /**
   * Return the recipe by its id or undefined if not found
   * @param id the recipe id.
   */
  getById(id: number): Promise<RecipeModel> {
    return this.httpClient.get(`/recipes/${id}`)
      .then((response) => response.data);
  }

  /**
   * Add a recipe in the database
   * @param recipe the recipe to add
   */
  add(recipe: RecipeModel): Promise<RecipeModel> {
    return this.httpClient.post('/recipes', recipe).then((response) => response.data);
  }
}

const recipeService = new RecipeService();
export default recipeService;
