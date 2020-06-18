<template>
    <div class="content">
        <div class="content">
            <b-skeleton
                    width="50%"
                    :active="loading"
            ></b-skeleton>
            <div v-if="!loading">
                <div v-if="recipes.length === 0">
                    <p class="is-size-3 has-text-centered">
                        Oups !<br/>
                        Il semblerait que vous n'ayez pas encore de recettes.<br/>
                        Cliquez ici pour en ajouter.
                    </p>
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
                </div>
                <div data-test="recipe-list">
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

    </div>
</template>
<script lang="ts">
import recipeService from '@/services/recipe-service';
import Vue from 'vue';
import { Recipe } from '@/models/recipe';

export default Vue.extend({
  name: 'RecipeList',
  data() {
    return {
      recipes: [] as Recipe[],
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
