<template>
    <div class="content">
        <div class="has-text-centered">
            <b-button
                    tag="router-link"
                    to="/recipe/create"
                    size="is-large"
                    icon-right="plus"
            >
                Ajouter une recette
            </b-button>
        </div>
    <ul>
        <li
                v-for="recipe in recipes"
                :key="recipe.id"
        >
           <router-link :to="{name:'Recipe', params:{id: recipe.id}}">{{recipe.name}}</router-link>
        </li>
    </ul>
    </div>
</template>
<script>
import RecipeService from '@/services/recipe.service';

export default {
  name: 'RecipeList',
  data() {
    return {
      recipes: [],
    };
  },
  created() {
    this.recipes = RecipeService.getAll();
  },
};
</script>
