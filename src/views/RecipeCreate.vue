<template>
    <section class="content">
        <h3 class="title is-5">Ajouter une recette</h3>
        <ValidationObserver ref="observer" v-slot="{ passes }">
            <BInputWithValidation
                    id="name"
                    rules="required"
                    type="text"
                    label="Nom"
                    v-model="recipe.name"
                    placeholder="Nom de la recette"
            />

            <div class="buttons">
                <b-button
                        id="add"
                        @click="passes(submit)"
                        type="is-success"
                        icon-left="check"
                        :loading="loading"
                >
                    Ajouter
                </b-button>
                <b-button
                        id="reset"
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
import RecipeService from '@/services/recipe-service';
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
      loading: false,
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
      this.loading = true;
      RecipeService.add(this.recipe)
        .then(() => {
          this.$router.push({ name: 'RecipeList' });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
