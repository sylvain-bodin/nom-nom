<template>
    <div class="content">
        <div class="has-text-centered">
            <b-button
                    tag="router-link"
                    to="/recipe/create"
                    size="is-large"
                    icon-right="plus"
                    data-test="add-recipe"
            >
                Ajouter une recette
            </b-button>
        </div>
        <div class="content">
            <b-skeleton
                    width="50%"
                    :active="loading"
            ></b-skeleton>
            <div data-test="recipe-list" v-if="!loading">
                <article
                        class="media"
                        v-for="recipe in recipes"
                        :key="recipe._id"

                >
                    <figure class="media-left">
                        <p class="image is-48x48">
                            <img :src="recipe.image" alt="Aperçu de la recette">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <router-link
                                        :to="{name:'Recipe', params:{id: recipe._id}}"
                                >
                                    <strong>{{recipe.name}}</strong>
                                </router-link>
                            </p>
                        </div>

                    </div>
                </article>
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import recipeService from '@/services/recipe-service';
import Vue from 'vue';
import { RecipeModel } from '@/models/recipe-model';

export default Vue.extend({
  name: 'RecipeList',
  data() {
    return {
      recipes: [] as RecipeModel[],
      loading: true,
    };
  },
  mounted() {
    recipeService.getAll()
      .then((recipes) => {
        this.recipes = recipes;
      })
      .finally(() => {
        this.loading = false;
      });
  },
});
</script>
<style scoped>
    .b-skeleton {
        margin-top: 1em;
        margin-left: 2em;
    }
</style>
