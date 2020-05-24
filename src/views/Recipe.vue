<template>
    <section class="content">
        <h3 class="title is-4 has-text-centered">
            <template v-if="!loading">{{recipe.name}}</template>
            <b-skeleton :active="loading"></b-skeleton>
        </h3>
        <b-skeleton
                height="480px"
                :active="loading"
        ></b-skeleton>
        <figure class="image is-4by3" v-if="!loading">
            <img :src="recipe.image" alt="image de la recette">
        </figure>
        <p>
            <a :href="recipe.url">Lien vers la recette</a>
        </p>
        <h4 class="subtitle is-6">Etiquettes : </h4>
        <b-taglist>
            <b-tag type="is-info" v-for="tag in recipe.tags" :key="tag">{{tag}}</b-tag>
        </b-taglist>
    </section>
</template>

<script>
import recipeService from '@/services/recipe-service';

export default {
  name: 'Recipe',
  data() {
    return {
      recipe: {},
      loading: true,
    };
  },
  mounted() {
    recipeService.getById(this.$route.params.id)
      .then((recipe) => {
        this.recipe = recipe;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>

</style>
