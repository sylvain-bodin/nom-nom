<template>
    <section class="content">
        <h3 class="title is-5">Ajouter une recette</h3>
        <b-field label="Nom">
            <b-input placeholder="Nom de la recette" v-model="recipe.name"></b-input>
        </b-field>
        <div class="buttons">
            <b-button @click="reset" type="is-danger">Réinitialiser</b-button>
            <b-button @click="add" type="is-primary">Ajouter</b-button>
        </div>
    </section>
</template>

<script>
import RecipeService from '@/services/recipe.service';

export default {
  name: 'RecipeCreate',
  data() {
    return {
      recipe: {
        id: null,
        name: null,
      },
    };
  },
  methods: {
    reset() {
      this.recipe.name = null;
    },
    add() {
      RecipeService.add(this.recipe);
      this.$router.push({ name: 'RecipeList' });
    },
  },
};
</script>

<style scoped>

</style>
