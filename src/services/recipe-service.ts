import { Recipe } from '@/models/recipe';
import HttpClient from '@/services/http-client';
import { Ingredient } from '@/models/ingredient';

class RecipeService {
  private httpClient = HttpClient;

  /**
   * Return all the recipes
   */
  getAll(): Promise<Recipe[]> {
    return this.httpClient.get('/recipes')
      .then((response) => response.data);
  }

  /**
   * Add a recipe in the database
   * @param recipe the recipe to add
   */
  add(recipe: Recipe): Promise<string> {
    return this.httpClient.post('/recipes', recipe).then((response) => response.data);
  }

  /**
   * Return the recipe by its id or undefined if not found
   * @param id the recipe id.
   */
  getById(id: string): Promise<Recipe> {
    return this.httpClient.get(`/recipes/${id}`)
      .then((response) => response.data);
  }

  /**
   * Delete a recipe by its id
   * @param id the recipe id
   */
  delete(id: string): Promise<string> {
    return this.httpClient.delete(`/recipes/${id}`).then((response) => response.data);
  }

  /**
   * Import a recipe
   * @param url the url of the recipe to import
   */
  import(url: string | undefined): Promise<Recipe> {
    return this.httpClient.post('/recipes/import', { url }).then((response) => response.data);
  }

  /**
   * Transform ingredients text into a list of ingredient
   * @param text the ingredients text
   */
  getIngredients(text: string): Promise<Ingredient[]> {
    return this.httpClient.post('/recipes/ingredients/transform', { text }).then((response) => response.data);
  }

  /**
   * Get all the tags of the recipes available in the database
   */
  getAllTags(): Promise<string[]> {
    return this.httpClient.get('/recipes/tags').then((response) => response.data);
  }

  searchRecipes(offset: number, limit: number, sortField: string, sortOrder = 'asc', fields?: string):
    Promise<Paginate<Recipe>> {
    const params = {
      offset,
      limit,
      sort: null as unknown as string,
      fields,
    };
    if (sortField) {
      if (sortOrder === 'asc') {
        params.sort = `+${sortField}`;
      } else if (sortOrder === 'desc') {
        params.sort = `-${sortField}`;
      }
    }
    return this.httpClient.get('/recipes/search', { params }).then((response) => response.data);
  }
}

const recipeService = new RecipeService();
export default recipeService;
