import { Ingredient } from '@/models/ingredient';

export default class Utils {
  static prettyPrint(ingredient: Ingredient) {
    return `${ingredient.value ? `${ingredient.value} ` : ''}${ingredient.unit ? `${ingredient.unit} ` : ''}${ingredient.name}`;
  }
}
