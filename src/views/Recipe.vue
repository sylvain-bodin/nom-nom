<template>
    <p>{{recipeName}}</p>
</template>

<script>
import RecipeService from '@/services/recipe.service';

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
  created() {
    this.recipe = RecipeService.getById(this.$route.params.id);
  },
};
</script>

<style scoped>

</style>
