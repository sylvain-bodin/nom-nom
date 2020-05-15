<template>
    <section class="content">
        <h3 class="title is-5">Ajouter une recette</h3>
        <ValidationObserver ref="observer" v-slot="{ passes }">
            <BInputWithValidation
                    rules="required"
                    type="text"
                    label="Nom"
                    v-model="recipe.name"
                    placeholder="Nom de la recette"
            />

            <div class="buttons">
                <b-button
                        @click="passes(submit)"
                        type="is-success"
                        icon-left="check"
                >
                   Ajouter
                </b-button>
                <b-button
                        @click="reset"
                        icon-left="redo"
                >
                    Réinitialiser
                </b-button>
            </div>
        </ValidationObserver>
    </section>
</template>

<script>
import RecipeService from '@/services/recipe.service';
import { ValidationObserver } from 'vee-validate';
import BInputWithValidation from '../components/inputs/BInputWithValidation.vue';

export default {
  name: 'RecipeCreate',
  components: {
    ValidationObserver,
    BInputWithValidation,
  },
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
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },
    submit() {
      RecipeService.add(this.recipe);
      this.$router.push({ name: 'RecipeList' });
    },
  },
};
</script>

<style scoped>

</style>
