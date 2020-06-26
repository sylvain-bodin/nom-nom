import {Ingredient} from '@/models/ingredients';

export interface Recipe {
  _id: string | null;
  name: string;
  nbPortions?: number;
  ingredients: Ingredient[];
  url?: string;
  image?: string;
  tags?: string[];
  preparationTime?: number;
  waitingTime?: number;
  cookingTime?: number;
}
