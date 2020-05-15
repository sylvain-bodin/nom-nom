import { RecipeModel } from '@/model/recipeModel';

class RecipeService {
  private recipes: RecipeModel[] = [
    { id: 1, name: 'Recette 1' },
    { id: 2, name: 'Recette 2' },
    { id: 3, name: 'Recette 3' },
  ];

  /**
   * Return all the recipes
   */
  getAll(): RecipeModel[] {
    return this.recipes;
  }

  /**
   * Return the recipe by its id or undefined if not found
   * @param id the recipe id.
   */
  getById(id: number): RecipeModel | undefined {
    console.log(`Get recipe n ${id}`);
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

export default new RecipeService();
