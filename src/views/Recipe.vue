<template>
    <section class="section">
        <h3 class="title is-5">{{recipeName}}</h3>
    </section>
</template>

<script>
import RecipeService from '@/services/recipe-service';

export default {
  name: 'Recipe',
  data() {
    return {
      recipe: undefined,
    };
  },
  computed: {
    recipeName() {
      return this.recipe?.name;
    },
  },
  async created() {
    this.recipe = await RecipeService.getById(this.$route.params.id);
  },
};
</script>

<style scoped>

</style>
