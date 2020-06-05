export interface RecipeModel {
  _id: number | null;
  name: string;
  url?: string;
  image?: string;
  tags?: string[];
}
