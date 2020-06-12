export interface Recipe {
  _id: string | null;
  name: string;
  url?: string;
  image?: string;
  tags?: string[];
}
