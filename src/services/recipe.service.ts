import { RecipeModel } from '@/model/recipeModel';
import HttpClient from '@/services/http.service';

class RecipeService {
  private recipes: RecipeModel[] = [
    { id: 1, name: 'Recette 1' },
    { id: 2, name: 'Recette 2' },
    { id: 3, name: 'Recette 3' },
  ];

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
  getById(id: number): RecipeModel | undefined {
    return this.recipes.find((element) => element.id === id);
  }

  add(recipe: RecipeModel) {
    const r = recipe;
    if (!r.id) {
      r.id = this.recipes[this.recipes.length - 1].id + 1;
    }
    this.recipes.push(r);
  }
}

const recipeService = new RecipeService();
export default recipeService;
