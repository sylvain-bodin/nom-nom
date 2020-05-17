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
        <div class="content">
            <b-skeleton
                    width="50%"
                    :active="loading"
            ></b-skeleton>
            <ul v-if="!loading" class="test">
                <li
                        v-for="recipe in recipes"
                        :key="recipe.id"
                >
                    <router-link
                            :to="{name:'Recipe', params:{id: recipe.id}}"
                    >
                        {{recipe.name}}
                    </router-link>
                </li>
            </ul>

        </div>

    </div>
</template>
<script>
import RecipeService from '@/services/recipe.service';

export default {
  name: 'RecipeList',
  data() {
    return {
      recipes: [],
      loading: true,
    };
  },
  mounted() {
    RecipeService.getAll()
      .then((recipes) => {
        this.recipes = recipes;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
<style scoped>
    .b-skeleton {
        margin-top: 1em;
        margin-left: 2em;
    }
</style>
