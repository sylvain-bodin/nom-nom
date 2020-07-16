<template>
    <div class="content">
        <div class="content">
            <b-skeleton
                    width="50%"
                    :active="loading"
            ></b-skeleton>
            <div v-if="!loading">
                <RecipeLastAbsent v-if="recipes.length === 0"/>
                <div data-test="recipe-list">
                    <RecipeLastMediaItem v-for="recipe in recipes"
                                         :recipe="recipe"
                                         :key="recipe._id"
                                         @delete-recipe="deleteRecipe"/>
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import recipeService from '@/services/recipe-service';
import Vue from 'vue';
import { Recipe } from '@/models/recipe';
import RecipeLastAbsent from '@/views/Recipe/RecipeLastAbsent.vue';
import RecipeLastMediaItem from '@/views/Recipe/RecipeLastMediaItem.vue';

export default Vue.extend({
  name: 'RecipeList',
  components: { RecipeLastMediaItem, RecipeLastAbsent },
  data() {
    return {
      recipes: [] as Recipe[],
      loading: true,
    };
  },
  mounted() {
    this.getLastRecipes();
  },
  methods: {
    getLastRecipes() {
      recipeService.searchRecipes(0, 4, 'createdAt', 'asc', ['name', 'image'])
        .then((paginate) => {
          this.recipes = paginate.items;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteRecipe(id: string) {
      recipeService.delete(id).then(() => {
        this.getLastRecipes();
      });
    },
  },
});
</script>
<style scoped>
    .b-skeleton {
        margin-top: 1em;
        margin-left: 2em;
    }
</style>
